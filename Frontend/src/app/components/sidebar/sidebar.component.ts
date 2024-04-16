import { Component, OnInit } from '@angular/core';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { CommonModule } from '@angular/common';
import { AddMealsComponent } from '../add-meals/add-meals.component';
import { UserDataComponent } from '../user-data/user-data.component';
import { HistoryComponent } from '../history/history.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { Router } from '@angular/router';
import { CalculatorComponent } from '../calculator/calculator.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AddWorkoutComponent,CommonModule,AddMealsComponent,UserDataComponent,HistoryComponent,BlogsComponent,CalculatorComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  username: string ;
  isSignedUp: boolean = false;
  showAddWorkout = false;
  showAddMeal = false;
  showYourPlans = false;
  showTrackProgress = false;
  showBlogs = false; 
  showCalculator = false;

  constructor( private router: Router) {
   
    this.username = localStorage.getItem('username') ?? '';
  }

  ngOnInit(): void {
    
    this.loadAddWorkout();
  }
  loadAddWorkout(): void {
    this.showAddWorkout = true;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = false;
    this.showCalculator = false; 
  }

  loadAddMeal(): void {
    this.showAddWorkout = false;
    this.showAddMeal = true;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = false;
    this.showCalculator = false; 
  }
  loadCalculator(): void {
    this.showCalculator = true;
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = false;
  }

  loadYourPlans(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = true;
    this.showTrackProgress = false;
    this.showBlogs = false;
    this.showCalculator = false; 
  }

  loadTrackProgress(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = true;
    this.showBlogs = false; 
    this.showCalculator = false;
  }

  loadBlogs(): void {
    this.showAddWorkout = false;
    this.showAddMeal = false;
    this.showYourPlans = false;
    this.showTrackProgress = false;
    this.showBlogs = true;
    this.showCalculator = false; 
  }

  
  logout(): void {
    
    this.showSuccessNotification().then((confirmed) => {
      if (confirmed) {

        this.isSignedUp = false;
        localStorage.removeItem('token');
 
        this.router.navigate(['']);
     
      }
    });
  }

  async showSuccessNotification(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    });

    return result.isConfirmed;
  }
 
}
