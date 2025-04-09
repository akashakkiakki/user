import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();

  addUser(user: any) {
    const current = this.usersSubject.value;
    this.usersSubject.next([...current, user]);
  }
}
