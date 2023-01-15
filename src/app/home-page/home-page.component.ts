import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../models/task';
import { FirebaseStoreService } from '../services/firebase-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  currentUserId: string;
  tasks: Task[] = [];
  usersTasksIds: string[] = [];
  searchPhrase = '';
  selectedSize = '';

  constructor(private fireService: FirebaseStoreService,
    private snackBar: MatSnackBar) {
    this.currentUserId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.fireService.getCurrentUser(this.currentUserId)
      .subscribe(user => {
        if (user) this.usersTasksIds = user.tasks
      });

    this.fireService.getTasks()
      .subscribe(remoteTasks => 
        this.tasks = remoteTasks.filter(t => !this.usersTasksIds.includes(t.id)));
  }

  addToLibrary(task: Task) {
    if (this.usersTasksIds.includes(task.id))
      return;

    let updatedTasksIds: string[] = Object.assign([], this.usersTasksIds);
    updatedTasksIds.push(task.id);
    this.fireService.updateTasks(this.currentUserId, updatedTasksIds)
      .then(() => {
        this.usersTasksIds = updatedTasksIds;
        this.tasks.splice(this.tasks.indexOf(task), 1);
      })
      .catch(error => this.snackBar.open(`Error occured: ${error}`, 'Okay :('));
  }
}
