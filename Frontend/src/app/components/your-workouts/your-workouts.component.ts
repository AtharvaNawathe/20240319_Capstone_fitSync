import { Component,OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { log } from 'console';

interface Exercise {
  exercise_name: string;
  description: string;
  workout_status: string;
}

interface ScheduleEntry {
  day: string;
  exercises: Exercise[];
}

interface Workout {
  workout_name: string;
  schedule: ScheduleEntry[];
}

interface WorkoutHistory {
  _id: string;
  workout_name: string;
  day: string;
  exercises: Exercise[];
}


@Component({
  selector: 'app-your-workouts',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './your-workouts.component.html',
  styleUrl: './your-workouts.component.css'
})
export class YourWorkoutsComponent implements OnInit {
  workouts: Workout[] = [];
  selectedDay: string = '';
  exercises: Exercise[] = [];
  workoutName: string = '';
  workoutHistories: WorkoutHistory[] = [];
  formattedWorkoutHistories: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('Component initialized');
    this.fetchWorkouts();
    this.fetchWorkoutHistories();
  }

  fetchWorkouts() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    this.http.get<any>('http://localhost:3000/workouts/myworkouts', { headers })
      .subscribe(
        (response: any) => {
          this.workouts = response.workouts;
          // Set the workoutName to the workout name of the first workout in the list
          if (this.workouts.length > 0) {
            this.workoutName = this.workouts[0].workout_name;
          }
        },
        (error: any) => {
          console.error('Error fetching workouts:', error);
        }
      );
  }

  fetchWorkoutHistories(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    this.http.get<any>('http://localhost:3000/workouts/getworkouthistory', { headers })
    .subscribe(
      (response: WorkoutHistory[]) => {
        this.workoutHistories = response;
        this.formatWorkoutHistories();
      },
      (error: any) => {
        console.error('Error fetching workout histories:', error);
      }
    );

  }

  formatWorkoutHistories(): void {
    this.formattedWorkoutHistories = '';
    this.workoutHistories.forEach(history => {
      this.formattedWorkoutHistories += `${history.day}: ${history.workout_name}\n`;
      history.exercises.forEach(exercise => {
        this.formattedWorkoutHistories += `Exercise: ${exercise.exercise_name}\n`;
        this.formattedWorkoutHistories += `Description: ${exercise.description}\n`;
        this.formattedWorkoutHistories += `Status: ${exercise.workout_status}\n\n`;
      });
    });
  }




  selectDay(event: any) {
    const selectedValue = event.target.value;
    this.selectedDay = selectedValue;
    const selectedWorkout = this.workouts.find(workout => workout.schedule.some(entry => entry.day === selectedValue));
    if (selectedWorkout) {
      const daySchedule = selectedWorkout.schedule.find(entry => entry.day === selectedValue);
      this.exercises = daySchedule ? daySchedule.exercises : [];
    } else {
      this.exercises = [];
    }
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    const requestBody = {
      workout_name: this.workoutName,
      day: this.selectedDay
    };

    // Call the moveWorkoutToHistory API
    this.http.post<any>('http://localhost:3000/workouts/workouthistory', requestBody, { headers })
      .subscribe(
        (response: any) => {
          console.log('Workout data moved to history successfully');
          // Optionally, you can update the UI or perform other actions upon successful completion

          // Fetch workouts again after moving data to history
          this.fetchWorkouts();
          window.alert('Successfully Completed the task!');
          window.location.reload();
        
        },
        (error: any) => {
          console.error('Error moving workout data to history:', error);
        }
      );
  }
}
