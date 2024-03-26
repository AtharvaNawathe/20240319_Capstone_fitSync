import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-your-workouts',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './your-workouts.component.html',
  styleUrl: './your-workouts.component.css'
})
export class YourWorkoutsComponent {
  showDropdown: boolean = false;
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
