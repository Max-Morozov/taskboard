import { Component, OnInit } from '@angular/core';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  currentUserId: string;
  name: string = '';
  email: string = '';
  age: number = 18;
  status: string = '';

  constructor(private fireService: FirebaseStoreService,
    private alert: NotificationService) {
      this.currentUserId = localStorage.getItem('userId')!;
    }

  ngOnInit() {
    this.fireService.getCurrentUser(this.currentUserId)
      .subscribe(u => {
        if (!u) return;
        this.name = u.username;
        this.email = u.email;
        this.age = u.age;
        this.status = u.status;
      });
  }

  onSaved() {
    this.fireService.updateProfile(this.currentUserId, this.age, this.status)
      .then(() => this.alert.showSuccess('Update performed successfully'))
      .catch(error => this.alert.showError(error));
  }
}
