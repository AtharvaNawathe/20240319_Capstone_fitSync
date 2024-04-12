import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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
    this.router.navigate(['/auth']);
  }

  //when button it clicked 
  forgetPassword(): void {

    this.http.post('http://localhost:3000/user/forgotpassword', { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(this.email);
        window.alert("Password reset link sent to Email Successfully!!");
        console.log('Response:', response);
        this.router.navigate(['/auth']);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      }
    );
  }
}
