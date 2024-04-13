import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  formData: any = {}; // This will hold the form data

  constructor(private http: HttpClient,private router: Router) {}

  saveData() {
    // Assuming you want to send formData to backend on save
    this.http.post<any>('http://localhost:3000/user/save', this.formData)
      .subscribe(
        (response) => {
          console.log('Data saved successfully!', response);
          // Clear form after successful save if needed
          this.formData = {};
          window.alert("You have successfullt filled the data");
          this.router.navigate(['/auth']);
        },
        (error) => {
          console.error('Error saving data:', error);
        }
      );
  }
}