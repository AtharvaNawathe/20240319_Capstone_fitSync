import { Component,OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface MealPlan {
  meal_name: string;
  meal_plan: { meal_type: string; meals: { name: string; description: string; meal_status: string }[] }[];
}

interface MealType {
  meal_type: string;
  meals: Meal[];
}

interface Meal {
  name: string;
  description: string;
}

@Component({
  selector: 'app-your-meals',
  standalone: true,
  imports: [NavbarComponent,FormsModule,CommonModule],
  templateUrl: './your-meals.component.html',
  styleUrl: './your-meals.component.css'
})
export class YourMealsComponent implements OnInit {
  mealPlans: MealPlan[] = [];
  selectedMealType: string = '';
  selectedMeals: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMeals();
  }

  fetchMeals(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    this.http.get<any>('http://localhost:3000/meals/mymeals', { headers })
      .subscribe(
        (response: any) => {
          this.mealPlans = response?.meals ?? [];
          if (this.mealPlans.length > 0 && this.mealPlans[0].meal_plan.length > 0) {
            this.selectedMealType = this.mealPlans[0].meal_plan[0].meal_type;
            this.selectedMeals = this.mealPlans[0].meal_plan[0].meals;
          }
        },
        (error: any) => {
          console.error('Error fetching meals:', error);
        }
      );
  }

  onSelectMealType(event: any): void {
    const selectedType = event.target.value;
    const mealPlan = this.mealPlans.find(plan =>
        plan.meal_plan.some(mealType => mealType.meal_type === selectedType)
    );
    if (mealPlan) {
        this.selectedMealType = selectedType;
        this.selectedMeals = mealPlan.meal_plan
            .find(mealType => mealType.meal_type === selectedType)?.meals ?? [];
    }
}
}