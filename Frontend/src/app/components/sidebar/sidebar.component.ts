import { Component, OnInit } from '@angular/core';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { CommonModule } from '@angular/common';
import { AddMealsComponent } from '../add-meals/add-meals.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { HistoryComponent } from '../history/history.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AddWorkoutComponent,CommonModule,AddMealsComponent,UserDataComponent,HistoryComponent,BlogsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  username: string ;
  isSignedUp: boolean = false;
  showAddWorkout = false;
  showAddMeal = false;
  showYourPlans = false;
  showTrackProgress = false;
  showBlogs = false; // New property to control blogs view

  constructor( private router: Router) {
    // Retrieve the username from localStorage on component initialization
    this.username = localStorage.getItem('username') ?? '';
  }
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

  Logout(): void {
    const confirmation = confirm('Are you sure you want to log out?');

    // Check if the user confirmed the action
    if (confirmation) {
      this.isSignedUp = false;
      // clearing the token from the local Storage
      localStorage.removeItem('token');
      // For example, to redirect to a login page, you might use Angular's Router (assuming it's injected in your constructor)

      this.router.navigate(['']);
      // this.clearSessionTimer();
    }
  }

}
