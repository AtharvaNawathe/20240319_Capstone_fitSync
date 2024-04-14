import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-add-meals',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-meals.component.html',
  styleUrl: './add-meals.component.css'
})
export class AddMealsComponent implements OnInit{
  mealForm!: FormGroup;
  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i);

  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner'];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.mealForm = this.fb.group({
      mealName: ['', Validators.required],
      mealType: ['', Validators.required],
      hour: ['', Validators.required],
      minute: ['', Validators.required],
      period: ['', Validators.required],
      date: ['', Validators.required],
      foodDescription: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.mealForm.valid) {
      const formData = this.mealForm.value;

      const token = localStorage.getItem('token'); // Assuming you have an auth token
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`
      });

      this.http
        .post<any>('http://localhost:3000/meals/addmealplans', formData, { headers })
        .subscribe({
          next: (response) => {
            console.log(response);
            // Reset form after successful submission
            this.mealForm.reset();
            alert('Meal added successfully!');
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Failed to add meal. Please try again.');
          }
        });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
