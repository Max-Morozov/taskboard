import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { NotificationService } from '../services/notification.service';

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
    private alert: NotificationService) {
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
        this.clearFilters();
      })
      .catch(error => this.alert.showError(error));
  }

  clearFilters() {
    if (this.selectedSize) this.selectedSize = '';
    if (this.searchPhrase) this.searchPhrase = '';
  }
}
