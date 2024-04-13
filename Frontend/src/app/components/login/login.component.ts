import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormsModule } from '@angular/forms'; // Import FormControl and FormGroup for form handling
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


interface LoginResponse {
  token: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,SignupComponent,NavbarComponent,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient


    // Replace 'your-backend-endpoint' with the URL to your backend login API
    login() {
      this.http.post<LoginResponse>('http://localhost:3000/user/login', this.user).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token);
          window.alert("You have successfully logged in");
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
  }

  ngOnInit(): void {
    // Logic to handle authentication status
  }


  googleAuth(): void {
    window.open(`https://smooth-flavor-1645.herokuapp.com/google/callback`, "_self");
  }

  navigateToSignup(): void
  {
    this.router.navigate(['/signup']);
  }
}
