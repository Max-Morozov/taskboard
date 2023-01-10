import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { FirebaseStoreService } from '../services/firebase-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  tasks: Task[] = [];
  searchPhrase = '';
  selectedSize = '';

  constructor(private fireService: FirebaseStoreService) { }

  ngOnInit(): void {
    this.fireService.getTasks()
      .subscribe(remoteTasks => this.tasks = remoteTasks);
  }
}
