import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-workouts',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './your-workouts.component.html',
  styleUrl: './your-workouts.component.css'
})
export class YourWorkoutsComponent implements OnInit {
  workoutsForm!: FormGroup;
  workouts: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.workoutsForm = this.formBuilder.group({
      fname: new FormControl(''),
      day: new FormControl(''),
      description: new FormControl('')
    });
  }
}
