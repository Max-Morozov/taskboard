import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }

  showCustomError(message: string) {
    this.snackBar.open(message, 'Okay :(');
  }

  showError(error: string) {
    this.snackBar.open(`Error occured: ${error}`, 'Okay :(');
  }
}
