import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'details', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: '', component: DetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
