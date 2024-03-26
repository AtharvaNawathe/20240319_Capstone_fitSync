import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { YourMealsComponent } from './components/your-meals/your-meals.component';
import { YourWorkoutsComponent } from './components/your-workouts/your-workouts.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'home', component:HomeComponent},
    { path: 'details', component: DetailsComponent},
    { path: 'auth', component: AuthenticationComponent},
    { path: 'yourmeals', component: YourMealsComponent},
    { path: 'yourworkouts', component:YourWorkoutsComponent}
];