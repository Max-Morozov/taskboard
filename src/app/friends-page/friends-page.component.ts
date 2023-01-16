import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Buddy } from '../models/buddy';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {
  currentUserId: string;
  myFriendsIds: string[] = [];
  allBuddies: Buddy[] = [];
  searchPhrase: string = '';

  constructor(private fireService: FirebaseStoreService,
    private alert: NotificationService) {
    this.currentUserId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.initMyFriends();
    this.initBuddies();
  }

  initMyFriends() {
    this.fireService.getCurrentUser(this.currentUserId)
    .subscribe(u => {
      if (u) this.myFriendsIds = u.friends;
    });
  }

  initBuddies() {
    this.fireService.getUsers(users => {
      let allUsers: User[] = users.filter(u => u.id !== this.currentUserId);
      this.allBuddies = allUsers.map(u => new Buddy(u, this.myFriendsIds.includes(u.id)));
      this.resort();
    });
  }

  addFriend(buddy: Buddy) {
    if (buddy.isFriend)
      return;

    let newFriendId: string = buddy.user.id;
    let updatedFriendsIds: string[] = Object.assign([], this.myFriendsIds);
    updatedFriendsIds.push(newFriendId);
    console.log(this.allBuddies);
    this.fireService.updateFriends(this.currentUserId, updatedFriendsIds)
      .then(() => {
        this.fireService.addFriend(newFriendId, this.currentUserId)
          .then(() => {
            this.myFriendsIds = updatedFriendsIds;
            buddy.isFriend = true;
            this.resort();
          })
      })
      .catch(error => this.alert.showError(error));
  }
  
  removeFriend(buddy: Buddy) {
    if (!buddy.isFriend)
      return;

    let oldFriendId: string = buddy.user.id;
    let updatedFriendsIds: string[] = Object.assign([], this.myFriendsIds);
    let targetIndex: number = updatedFriendsIds.indexOf(oldFriendId);
    if (targetIndex < 0)
      return;

    updatedFriendsIds.splice(targetIndex, 1);
    this.fireService.updateFriends(this.currentUserId, updatedFriendsIds)
      .then(() => {
        this.fireService.removeFriend(oldFriendId, this.currentUserId)
          .then(() => {
            this.myFriendsIds = updatedFriendsIds;
            buddy.isFriend = false;
            this.resort();
        })
      })
      .catch(error => this.alert.showError(error));
  }

  resort() {
    this.allBuddies.sort((a, b) => Number(b.isFriend) - Number(a.isFriend));
  }
}

