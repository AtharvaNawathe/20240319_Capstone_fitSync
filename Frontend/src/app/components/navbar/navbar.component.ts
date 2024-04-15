
import { Component, OnInit, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,CommonModule,MatIconModule,HttpClientModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Input() showMealsButton: boolean = true;
  @Input() showWorkoutsButton: boolean = true;
  @Input() customClass: string = '';
  isSignedUp: boolean = false;

  constructor(private router: Router) { }
  navigateToWorkouts() { 
    this.router.navigate(['/yourworkouts']);
  
  }
  navigateToMeals() {
    this.router.navigate(['/yourmeals']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToProfile() {
    this.router.navigate(['/editprofile']);
  }
  Logout(): void {
    const confirmation = confirm('Are you sure you want to log out?');

    // Check if the user confirmed the action
    if (confirmation) {
      this.isSignedUp = false;
      // clearing the token from the local Storage
      localStorage.removeItem('token');
      // For example, to redirect to a login page, you might use Angular's Router (assuming it's injected in your constructor)

      this.router.navigate(['/auth']);
      // this.clearSessionTimer();
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    // Show confirmation dialog
    this.showSuccessNotification().then((confirmed) => {
      if (confirmed) {
        // User confirmed, perform logout actions
        this.isSignedUp = false;
        localStorage.removeItem('token');
        // Redirect to login page after logout
        this.router.navigate(['']);
        // Optionally, clear session timer or other tasks
        // this.clearSessionTimer();
      }
    });
  }

  async showSuccessNotification(): Promise<boolean> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    });

    return result.isConfirmed;
  }
 
}
