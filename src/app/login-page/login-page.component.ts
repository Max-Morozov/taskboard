import { Component } from '@angular/core';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { Router } from '@angular/router';
import { sha256 } from 'js-sha256';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar) { }

  onFormSubmitted() {
    if (this.email && this.password) {
      let hash = sha256(this.password);
      this.fireService.getUsers()
        .subscribe(users => {
          let user = users.find(u => u.email === this.email && u.password === hash);
          if (user) {
            localStorage.setItem('userId', user.id);
            this.router.navigate(['home']);
          }
          else this.snackBar.open('Invalid login or password.', 'Okay :(');
        });
    }
  }
}
