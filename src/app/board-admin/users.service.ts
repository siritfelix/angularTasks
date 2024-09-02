import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
const API_URL = 'http://localhost:8080/users';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(API_URL);
  }

  removById(id: number): Observable<any> {
    return this.http.delete(API_URL + '/' + id);
  }

  upDateRole(id: number, role: string): Observable<any> {
    return this.http.patch(API_URL + '/' + id + '/' + role, {});
  }
}
