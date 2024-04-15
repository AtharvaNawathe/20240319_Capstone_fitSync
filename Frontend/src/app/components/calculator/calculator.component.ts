import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  activities = [
    { name: 'Little to no exercise', multiply: 1.2 },
    { name: 'Light exercise (1–3 days per week)', multiply: 1.375 },
    { name: 'Moderate exercise (3–5 days per week)', multiply: 1.55 },
    { name: 'Heavy exercise (6–7 days per week)', multiply: 1.725 },
    { name: 'Very heavy exercise (twice per day, extra heavy workouts)', multiply: 1.9 }
  ];

  goals = [
    { name: 'Lose weight - 1lb per week', alt: 'tone', cals: 500 },
    { name: 'Lose weight - 2lb per week', alt: 'tone', cals: 1000 },
    { name: 'Gain weight - 1lb per week', alt: 'bulk', cals: -500 },
    { name: 'Gain weight - 2lb per week', alt: 'bulk', cals: -1000 },
    { name: 'Maintain weight', alt: 'tone', cals: 0 }
  ];

  breakfast = [
    { name: 'protein', value: () => this.proteinCals() * 0.0252 / 4 },
    { name: 'carbs', value: () => this.carbsCals() * 0.0933 / 4 },
    { name: 'fat', value: () => this.fatCals() * 0.3467 / 8 }
  ];

  snack = [
    { name: 'protein', value: () => this.proteinCals() * 0.0573 / 4 },
    { name: 'carbs', value: () => this.carbsCals() * 0.1295 / 4 },
    { name: 'fat', value: () => this.fatCals() * 0.04 / 8 }
  ];

  mainMeal = [
    { name: 'protein', value: () => this.proteinCals() * 0.4014 / 4 },
    { name: 'carbs', value: () => this.carbsCals() * 0.2591 / 4 },
    { name: 'fat', value: () => this.fatCals() * 0.2666 / 8 }
  ];

  weight: number = 0 ;
  height: number = 0;
  age: number = 0;
  gender: string = '';
  selectedActivity: any;
  selectedGoal: any;

  bmr(): number {
    let standard = (this.weight * 10) + (this.height * 6.25) - (this.age * 5);

    if (this.gender === 'male') {
      return standard + 5;
    } else if (this.gender === 'female') {
      return standard - 161;
    } else {
      return NaN; // return NaN for invalid gender (handled by Angular's number validation)
    }
  }

  cals(): number {
    if (!isNaN(this.bmr()) && this.selectedActivity && this.selectedGoal) {
      return this.bmr() * this.selectedActivity.multiply - this.selectedGoal.cals;
    } else {
      return NaN;
    }
  }

  proteinCals(): number {
    return this.cals() * 0.55;
  }

  carbsCals(): number {
    return this.cals() * 0.25;
  }

  fatCals(): number {
    return this.cals() * 0.2;
  }
}
