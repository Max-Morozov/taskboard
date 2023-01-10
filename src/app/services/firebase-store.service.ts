import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStoreService {
  private usersRoot = 'users';
  private tasksRoot = 'tasks';

  constructor(private store: AngularFirestore) { }

  getCurrentUser(id: string): Observable<User | undefined> {
    return this.store.collection<User>(this.usersRoot).doc(id).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.store.collection<User>(this.usersRoot).valueChanges({ idField: 'id' });
  }

  getTasks(): Observable<Task[]> {
    return this.store.collection<Task>(this.tasksRoot).valueChanges({ idField: 'id' });
  }

  updateFriends(userId: string, friends: string[]): Promise<void> {
    return this.store.collection<User>(this.usersRoot).doc(userId).update({ friends: friends });
  }

  updateTasks(userId: string, tasks: string[]) {
    this.store.collection<User>(this.usersRoot).doc(userId).update({ tasks: tasks });
  }

  updateProfile(userId: string, age: number, status: string) {
    this.store.collection<User>(this.usersRoot).doc(userId).update({ age: age, status: status });
  }
}
