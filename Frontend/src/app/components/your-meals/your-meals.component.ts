import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-your-meals',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './your-meals.component.html',
  styleUrl: './your-meals.component.css'
})
export class YourMealsComponent {

}
