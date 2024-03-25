import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user/personaldetails'; // Your backend API URL
  constructor(private http: HttpClient) { }

  submitDetails(formData: any): Observable<any> {
    
    const token = localStorage.getItem('token'); // Get token from local storage
    const headers = new HttpHeaders().set('Authorization', token|| ''); // Set authorization header

    return this.http.put<any>(this.apiUrl, formData, { headers });
  }
}