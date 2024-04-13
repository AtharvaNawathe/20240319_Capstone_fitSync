import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-meals',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-meals.component.html',
  styleUrl: './add-meals.component.css'
})
export class AddMealsComponent implements OnInit{
  mealForm!: FormGroup;
  hours: number[] = []; 
  minutes: number[] = [];

  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner']; // Dropdown options for meal types

  constructor(private fb: FormBuilder) { }

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

    for (let i = 1; i <= 12; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i <= 59; i++) {
      this.minutes.push(i);
    }
  }

  onSubmit() {
    if (this.mealForm.valid) {
      console.log(this.mealForm.value);
      // Reset form after submission
      this.mealForm.reset();
    }
  }

}
