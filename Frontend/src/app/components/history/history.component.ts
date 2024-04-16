import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  showWorkouts = true;
  showMeals = false;
  workouts: any[] = [];
  meals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWorkoutHistory();
    this.fetchMealHistory();
  }

  fetchWorkoutHistory(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || ''
    });

    this.http.get<any>('http://localhost:3000/workouts/getworkouthistory', { headers })
      .subscribe(
        (response) => {
          this.workouts = response; 
        },
        (error) => {
          console.error('Error fetching workout history:', error);
        }
      );
  }

  fetchMealHistory(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || ''
    });

    this.http.get<any>('http://localhost:3000/meals/getmealshistory', { headers })
      .subscribe(
        (response) => {
          this.meals = response;
        },
        (error) => {
          console.error('Error fetching meal history:', error);
        }
      );
  }
}
