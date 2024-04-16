import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  formData: any = {}; 

  constructor(private http: HttpClient,private router: Router) {}

  saveData() {
    
    this.http.post<any>('http://localhost:3000/user/save', this.formData)
      .subscribe(
        (response) => {
          console.log('Data saved successfully!', response);
          
          this.formData = {};
          this.showSuccessNotification();
          this.router.navigate(['/login']);
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
      title: 'Data Saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  showUnsuccessNotification(): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to add Data. Please try again.",
      footer: ''
    });
  }
}
