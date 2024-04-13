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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      timeRequired: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      date: ['', Validators.required],
      activity: ['', Validators.required],
      preferredActivity: [''],
      durationHours: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      durationMinutes: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      notes: ['']
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.workoutForm.controls; }

  onSubmit() {
    // Handle form submission, e.g., send data to backend
    if (this.workoutForm.valid) {
      console.log(this.workoutForm.value);
      // Reset form after submission
      this.workoutForm.reset();
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
