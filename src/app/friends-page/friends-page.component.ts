import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Buddy } from '../models/buddy';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {
  currentUserId: string;
  myFriendsIds: string[] = [];
  allBuddies: Buddy[] = [];

  constructor(private fireService: FirebaseStoreService,
    private snackBar: MatSnackBar) {
    this.currentUserId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.initBuddies();
  }

  initBuddies() {
    let allUsers: User[] = [];
    this.fireService.getUsers()
      .subscribe(users => allUsers = users.filter(u => u.id !== this.currentUserId));

    this.fireService.getCurrentUser(this.currentUserId)
      .subscribe(u => {
        if (u) this.myFriendsIds = u.friends;
      });

    this.allBuddies = allUsers.map(u => new Buddy(u, this.myFriendsIds.includes(u.id)));
  }

  addFriend(buddy: Buddy) {
    if (buddy.isFriend)
      return;

    let updatedFriendIds: string[] = Object.assign([], this.myFriendsIds);
    updatedFriendIds.push(buddy.user.id);
    this.fireService.updateFriends(this.currentUserId, updatedFriendIds)
      .then(() => {
        this.myFriendsIds = updatedFriendIds;
        buddy.isFriend = true;
      })
      .catch(error => this.snackBar.open(`Error occured: ${error}`, 'Okay :('));
  }
  
  removeFriend(buddy: Buddy) {
    if (!buddy.isFriend)
      return;

    let updatedFriendIds: string[] = Object.assign([], this.myFriendsIds);
    let targetIndex: number = updatedFriendIds.indexOf(buddy.user.id);
    if (targetIndex < 0)
      return;

    updatedFriendIds.splice(targetIndex, 1);
    this.fireService.updateFriends(this.currentUserId, updatedFriendIds)
      .then(() => {
        this.myFriendsIds = updatedFriendIds;
        buddy.isFriend = false;
      })
      .catch(error => this.snackBar.open(`Error occured: ${error}`, 'Okay :('));
  }
}

