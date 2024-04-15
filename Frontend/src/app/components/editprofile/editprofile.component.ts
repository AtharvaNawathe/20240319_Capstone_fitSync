import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {}; // Define user object to store retrieved user details

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    // Make HTTP GET request to fetch user profile details from backend API
    this.http.get<any>('http://localhost:3000/user/getprofile' ,{ headers })
      .subscribe(
        (response) => {
          if (response.success) {
            this.user = response.user; // Store user details in 'user' object
          } else {
            console.error('Failed to fetch user profile details');
          }
        },
        (error) => {
          console.error('Error occurred while fetching user profile:', error);
        }
      );
  }

  saveChanges() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make HTTP POST request to update user profile details
    this.http.put<any>('http://localhost:3000/user/editprofile', this.user, { headers })
      .subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          // Optionally, redirect to another page after successful update
          this.showSuccessNotification();
          window.location.reload(); 

        },
        (error) => {
          this.showUnsuccessNotification();
        }
      );
  }

  showSuccessNotification(): void {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Profile changes successfull!',
      showConfirmButton: false,
      timer: 3000
    });
  }

  showUnsuccessNotification(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to save changes. Please try again.",
      footer: ''
    });
  }
}
