
import { Component, OnInit, Input } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import Swal from 'sweetalert2';


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

   
    if (confirmation) {
      this.isSignedUp = false;
      
      localStorage.removeItem('token');
   

      this.router.navigate(['/auth']);

    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    
    this.showSuccessNotification().then((confirmed) => {
      if (confirmed) {
        
        this.isSignedUp = false;
        localStorage.removeItem('token');
       
        this.router.navigate(['']);
    
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
