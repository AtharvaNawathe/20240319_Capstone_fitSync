import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule,HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit {
  showWorkouts = true;
  showMeals = false;
  workouts: any[] = [];
  meals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWorkouts();
    this.fetchMeals();
  }

  fetchWorkouts(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`
    });

    this.http.get<any>('http://localhost:3000/workouts/myworkouts', { headers })
      .subscribe(
        (response) => {
          this.workouts = response.workouts; 
        },
        (error) => {
          console.error('Error fetching workouts:', error);
        }
      );
  }

  fetchMeals(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${localStorage.getItem('token')}`
    });

    this.http.get<any>('http://localhost:3000/meals/mymeals', { headers })
      .subscribe(
        (response) => {
          this.meals = response.meals; 
        },
        (error) => {
          console.error('Error fetching meals:', error);
        }
      );
  }

  moveWorkoutToHistory(activity_name: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || ''
    });

    this.http.post<any>('http://localhost:3000/workouts/workouthistory', { activity_name }, { headers })
      .subscribe(
        (response) => {
          console.log('Workout moved to history successfully:', response);
          
          this.fetchWorkouts();
          this.showSuccessNotification();
        },
        (error) => {
          console.error('Error moving workout to history:', error);
        }
      );
  }

  moveMealToHistory(mealName: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') || ''
    });

    this.http.post<any>('http://localhost:3000/meals/mealhistory', { mealName }, { headers })
      .subscribe(
        (response) => {
         
          this.fetchMeals();
          this.showSuccessNotification();
        },
        (error) => {
          console.error('Error moving meal to history:', error);
        }
      );
  }

  showSuccessNotification(): void {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Congratulations! You have completed the task!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
