import { Component,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
})
export class AddWorkoutComponent {
  workoutForm!: FormGroup;

  // List of activities for the dropdown
  activities: string[] = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Other'];

  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      activity_name: ['', Validators.required],
      date: ['', Validators.required],
      activity_description:['',Validators.required],
      activity: ['', Validators.required],
      preferredActivity: [''],
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      notes: ['']
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.workoutForm.controls; }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (token) {
      const formData = this.workoutForm.value;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ` ${token}`
      });

      console.log(headers);
      
  
      this.http.post<any>('http://localhost:3000/workouts/addworkoutplans', formData, { headers })
        .subscribe({
          next: (response) => {
            console.log(response);
            // Reset the form after successful submission
            this.workoutForm.reset();
            window.alert("Success");
          },
          error: (error) => {
            console.error('Error:', error);
            // Handle error
          }
        });
    }
  }
  

  onActivityChange(selectedActivity: string) {
    const preferredActivityControl = this.workoutForm.get('preferredActivity') as AbstractControl | null;

    if (preferredActivityControl) {
      if (selectedActivity === 'Other') {
        preferredActivityControl.setValidators(Validators.required);
      } else {
        preferredActivityControl.clearValidators();
      }

      preferredActivityControl.updateValueAndValidity();
    }
  }
}
