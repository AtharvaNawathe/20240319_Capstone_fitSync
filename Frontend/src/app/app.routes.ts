import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { AddMealsComponent } from './components/add-meals/add-meals.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'home', component:HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'forgotpassword', component:ForgotpasswordComponent},
    { path: 'resetpassword', component:ResetpasswordComponent},
    { path: 'profile', component:ProfileComponent},
    { path: 'editprofile', component:EditprofileComponent},
    { path: 'addworkout', component:AddWorkoutComponent},
    { path: 'addmeal', component:AddMealsComponent},
    { path: '**', component:PageNotFoundComponent},
];