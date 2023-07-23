import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../types/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private serverUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {

  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/register`, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.serverUrl}/login`, user);
  }

  logout() {
    localStorage.setItem('user', '{}');
  }

  isLogged() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return Boolean(user.email);
  }
}
