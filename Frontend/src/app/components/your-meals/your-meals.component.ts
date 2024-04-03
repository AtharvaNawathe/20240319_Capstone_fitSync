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
  selectedMealName: string = '';
  selectedMeals: any[] = [];
  formattedMealHistories: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMeals();
    this.fetchMealHistories();
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
            this.selectedMealName = this.mealPlans[0].meal_name; // Fetch the meal name
          }
        },
        (error: any) => {
          console.error('Error fetching meals:', error);
        }
      );
  }

  fetchMealHistories(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    this.http.get<any>('http://localhost:3000/meals/getmealshistory', { headers })
      .subscribe(
        (response: any[]) => {
          this.formatMealHistories(response);
        },
        (error: any) => {
          console.error('Error fetching meal histories:', error);
        }
      );
  }

  formatMealHistories(mealHistories: any[]): void {
    this.formattedMealHistories = mealHistories.map(history => {
      let formattedHistory = `${history.meal_name}:\n\n`;
      history.meal_plan.forEach((mealType: any) => {
        formattedHistory += `${mealType.meal_type}:\n`;
        mealType.meals.forEach((meal: any) => {
          formattedHistory += `${meal.name}: ${meal.description}\n`;
        });
      });
      return formattedHistory;
    }).join('');
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
      meal_name: this.selectedMealName,
      meal_type: this.selectedMealType
    };

    // Call the moveWorkoutToHistory API
    this.http.post<any>('http://localhost:3000/meals/mealhistory', requestBody, { headers })
      .subscribe(
        (response: any) => {
          console.log('Meals data moved to history successfully');
          // Optionally, you can update the UI or perform other actions upon successful completion

          // Fetch workouts again after moving data to history
          this.fetchMeals();
          window.alert('Successfully Completed the task!');
          window.location.reload();
        
        },
        (error: any) => {
          console.error('Error moving workout data to history:', error);
        }
      );
  }
}