// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(userData: { username: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/login', userData);
  }

  signup(userData: { name: string, username: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user/signup', userData);
  }

}
