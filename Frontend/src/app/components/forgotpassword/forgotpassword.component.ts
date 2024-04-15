import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  emailInputFocused: boolean = false;
  
  // String variable to store the user's email
  email: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  navigateToAuth ()
  {
    this.router.navigate(['/login']);
  }

  //when button it clicked 
  forgetPassword(): void {

    this.http.post('http://localhost:3000/user/forgotpassword', { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(this.email);
        this.showSuccessNotification();
        console.log('Response:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle any errors that occur during the request
        this.showUnsuccessNotification();
      }
    );
  }

  showSuccessNotification(): void {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Password reset link sent to Email Successfully!!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showUnsuccessNotification(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to sent link. Please try again.",
      footer: ''
    });
  }
}
