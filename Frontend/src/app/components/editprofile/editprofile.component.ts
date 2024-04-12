import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {}; // Define user object to store retrieved user details

  constructor(private http: HttpClient) { }

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
    this.http.get<any>('http://localhost:3000/user/profiledetails' ,{ headers })
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
}
