import { Component } from '@angular/core';
import { Task } from '../models/task';
import { FirebaseStoreService } from '../services/firebase-store.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.css']
})
export class LibraryPageComponent {
  currentUserId: string;
  tasks: Task[] = [];
  
  constructor(private fireService: FirebaseStoreService,
    private alert: NotificationService) {
    this.currentUserId = localStorage.getItem('userId')!;
  }

  ngOnInit(): void {
    this.fireService.getCurrentUser(this.currentUserId)
      .subscribe(user => {
        if (!user) return;

        this.fireService.getTasks()
          .subscribe(remoteTasks => 
            this.tasks = remoteTasks.filter(t => user.tasks.includes(t.id)));
      });
  }

  remove(task: Task) {
    let updatedTasks: Task[] = Object.assign([], this.tasks);
    let targetIndex: number = updatedTasks.indexOf(task);
    if (targetIndex < 0)
      return;

    updatedTasks.splice(targetIndex, 1);
    this.fireService.updateTasks(this.currentUserId, updatedTasks.map(t => t.id))
      .then(() => {
        this.tasks = updatedTasks;
      })
      .catch(error => this.alert.showError(error));
  }
}
