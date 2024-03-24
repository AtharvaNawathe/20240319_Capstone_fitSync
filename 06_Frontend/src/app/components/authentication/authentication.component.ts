// authentication.component.ts

import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  signupData: any = {};
  loginData: any = {};

  constructor(
    private authService: AuthenticationService
  ) {}

  signup() {
    this.authService.signup(this.signupData)
      .subscribe(
        response => {
          console.log('Signup successful:', response);
          // Handle successful signup here (e.g., show success message, redirect to login page)
          
        },
        error => {
          console.error('Signup error:', error);
          // Handle signup error here (e.g., show error message)
        }
      );
  }

  login() {
    this.authService.login(this.loginData)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          // Handle successful login here (e.g., store user data in local storage, redirect to dashboard)
          localStorage.setItem('token', response.token);
        },
        error => {
          console.error('Login error:', error);
          // Handle login error here (e.g., show error message)
        }
      );
  }
}
