import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from '@angular/fire/firestore';

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

  getUsers(callback: (users: User[]) => void) {
    this.store.collection<User>(this.usersRoot).get()
      .subscribe(coll => {
        let users: User[] = coll.docs.map<User>(d => {
          let u: User = d.data();
          u.id = d.id;
          return u;
        });
        callback(users);
      });
  }

  getTasks(): Observable<Task[]> {
    return this.store.collection<Task>(this.tasksRoot).valueChanges({ idField: 'id' });
  }

  addFriend(userId: string, friendId: string): Promise<void> {
    return this.store.collection(this.usersRoot).doc(userId).update(
      { friends: arrayUnion(friendId) }
    );
  }
  
  removeFriend(userId: string, friendId: string): Promise<void> {
    return this.store.collection(this.usersRoot).doc(userId).update(
      { friends: arrayRemove(friendId) }
    );
  }

  updateFriends(userId: string, friends: string[]): Promise<void> {
    return this.store.collection<User>(this.usersRoot).doc(userId).update({ friends: friends });
  }

  updateTasks(userId: string, tasks: string[]): Promise<void> {
    return this.store.collection<User>(this.usersRoot).doc(userId).update({ tasks: tasks });
  }

  updateProfile(userId: string, age: number, status: string): Promise<void> {
    return this.store.collection<User>(this.usersRoot).doc(userId).update({ age: age, status: status });
  }
}
