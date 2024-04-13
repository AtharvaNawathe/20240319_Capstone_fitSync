import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = {
    name:'',
    username: '',
    email:'',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient


  signup() {
    this.http.post('http://localhost:3000/user/signup', this.user).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        window.alert("You have successfully Signed up");
      },
      error: (error) => {
        console.error('Signup failed', error);
      }
    });
}
}
