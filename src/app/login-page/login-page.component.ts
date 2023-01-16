import { Component } from '@angular/core';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private fireService: FirebaseStoreService,
    private router: Router,
    private alert: NotificationService) { }

  onFormSubmitted() {
    if (this.email && this.password) {
      let hash = sha256(this.password);
      this.fireService.getUsers(users => {
        let user = users.find(u => u.email === this.email && u.password === hash);
        if (user) {
          localStorage.setItem('userId', user.id);
          this.router.navigate(['home']);
        }
        else {
          this.alert.showCustomError('Invalid login or password.');
        }
      });
    }
  }
}
