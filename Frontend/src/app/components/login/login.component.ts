import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormsModule } from '@angular/forms'; // Import FormControl and FormGroup for form handling
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { NavbarComponent } from '../navbar/navbar.component'; 
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import Swal from 'sweetalert2';


interface LoginResponse {
  token: string;
  user: {
    username: string;

  };

  
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,SignupComponent,NavbarComponent,HttpClientModule,DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  user = {
    username: '',
    password: ''
  };
  loginError: string | null = null;
  visible = false

  constructor(private http: HttpClient, private router: Router) {} 


    login() {
      this.http.post<LoginResponse>('http://localhost:3000/user/login', this.user).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.user.username);
          this.showSuccessNotification();
          this.loginError = null;
          this.router.navigate(['/home']);
        },
        error: (error) => {
         this.showUnsuccessNotification();
        }
      });
  }
  showSuccessNotification(): void {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Login Successful',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showUnsuccessNotification(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Credentials",
      footer: ''
    });
  }

  

  ngOnInit(): void {
   
  }


  googleAuth(): void {
    window.open(`https://smooth-flavor-1645.herokuapp.com/google/callback`, "_self");
  }

  navigateToSignup(): void
  {
    this.router.navigate(['/signup']);
  }

  navigateToForgotPassword(): void
  {
    this.router.navigate(['/forgotpassword']);
  }

}
