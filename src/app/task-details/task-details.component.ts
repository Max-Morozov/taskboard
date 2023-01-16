import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Input() libraryView: boolean = false;
  @Output() addToLibrary = new EventEmitter<Task>();
  @Output() removeFromLibrary = new EventEmitter<Task>();

  addToLibraryPrivate() {
    if (!this.libraryView)
      this.addToLibrary.emit(this.task);
  }
  
  removeFromLibraryPrivate() {
    if (this.libraryView)
      this.removeFromLibrary.emit(this.task);
  }
}
