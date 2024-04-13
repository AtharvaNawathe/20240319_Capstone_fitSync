import { Component } from '@angular/core';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { CommonModule } from '@angular/common';
import { AddMealsComponent } from '../add-meals/add-meals.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { HistoryComponent } from '../history/history.component';
import { BlogsComponent } from '../blogs/blogs.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AddWorkoutComponent,CommonModule,AddMealsComponent,UserDataComponent,HistoryComponent,BlogsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  showAddWorkout = false;
  showAddMeal = false;
  showYourPlans = false;
  showTrackProgress = false;
  showBlogs = false; // New property to control blogs view

  loadAddWorkout(): void {
    this.showAddWorkout = true;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = false; // Hide blogs view
  }

  loadAddMeal(): void {
    this.showAddWorkout = false;
    this.showAddMeal = true;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = false; // Hide blogs view
  }

  loadYourPlans(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = true;
    this.showTrackProgress = false;
    this.showBlogs = false; // Hide blogs view
  }

  loadTrackProgress(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = true;
    this.showBlogs = false; // Hide blogs view
  }

  loadBlogs(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = true; // Show blogs view
  }

}
