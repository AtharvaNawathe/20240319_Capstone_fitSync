import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  showWorkouts = true; // Default to showing workouts
  showMeals = false;

  workouts = [
    {
      name: 'Morning Run',
      description: 'Ran 5 kilometers in the park.',
      duration: 30,
      userName: 'John Doe',
      date: new Date()
    },
    {
      name: 'Circuit Training',
      description: 'Full-body workout session.',
      duration: 45,
      userName: 'Jane Smith',
      date: new Date()
    }
  ];

  meals = [
    {
      name: 'Breakfast',
      description: 'Oatmeal with fruits.',
      userName: 'John Doe',
      date: new Date()
    },
    {
      name: 'Lunch',
      description: 'Grilled chicken salad.',
      userName: 'Jane Smith',
      date: new Date()
    }
  ];
}
