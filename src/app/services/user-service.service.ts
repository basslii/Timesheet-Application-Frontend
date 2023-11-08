import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{
  getAllUsers(): Observable<User[]> {
    const uri = `${this.base}/users`;
    return this.http.get<User[]>(uri);
  }

  getUserById(userId: string): Observable<User> {
    const uri = `${this.base}/users/${userId}`;
    return this.http.get<User>(uri);
  }
}
