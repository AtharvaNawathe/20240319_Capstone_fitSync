import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,HttpClientModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      weight: ['', Validators.required],
      height: ['', Validators.required],
      age: [''], // Add validators if needed
      gender: ['', Validators.required],
      goal: ['', Validators.required],
      veg: ['', Validators.required],
      workout_loc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Ensure token exists before making the request
    if (token) {
      // Set headers with authorization token
      const headers = { 'Authorization': token }; // Use object literal for headers

      // Send form data to the backend API with headers
      this.http.put<any>('http://localhost:3000/user/personaldetails', formData, { headers })
        .subscribe(
          (response) => {
            console.log('Data sent successfully:', response);
            // Handle success, e.g., show a success message
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error sending data:', error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      console.error('Token not found. User is not authenticated.');
      // Handle case where token is not found (user is not authenticated)
    }
  }
}
