import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for accessing URL parameters
import Swal from 'sweetalert2';


@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [FormsModule,NavbarComponent,HttpClientModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  passwordInputFocused: boolean = false;
  password: string = '';
  token: string | null = ''; // Variable to store the token

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {
    // Extract the token from the URL query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
    
  }

  resetPassword(): void {
    // Ensure the token is present
    if (!this.token) {
      console.error('Token is missing');
      return;
    }

    // Construct the URL with the dynamic token
    const url = `http://localhost:3000/user/resetpassword?token=${this.token}`;

    this.http.post(url, { password: this.password })
      .subscribe(
        (response) => {
          // Handle the response from the backend
          console.log('Response:', response);

          this.showSuccessNotification();
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        }
      );
  }

  showSuccessNotification(): void {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Password Reset Sucessfully!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
