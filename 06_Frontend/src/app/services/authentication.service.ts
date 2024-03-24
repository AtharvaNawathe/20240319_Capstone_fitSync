// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private backendUrl = 'http://localhost:3000/user'; // Change this to your backend URL

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/signup`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, userData);
  }
}
