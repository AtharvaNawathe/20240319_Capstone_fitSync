
import { Component, OnInit, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { WorkoutService } from '../../services/workout.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,CommonModule,MatIconModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() showMealsButton: boolean = true;
  @Input() showWorkoutsButton: boolean = true;

  constructor(private router: Router,    private workoutService: WorkoutService) { }
  navigateToWorkouts() { 
    this.router.navigate(['/yourworkouts']);
  
  }
  navigateToMeals() {
    this.router.navigate(['/yourmeals']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }
}
