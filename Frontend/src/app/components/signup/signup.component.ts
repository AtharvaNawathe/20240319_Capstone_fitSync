import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  user = {
    name:'',
    username: '',
    email:'',
    password: ''
  };

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {} // Inject HttpClient

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), this.passwordValidator]]
    });
  }

  passwordValidator(control: any) {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    return hasUpperCase ? null : { needsUpperCase: true };
  }

  get formControls() {
    return this.signupForm.controls;
  }
  
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  signup() {
    this.http.post('http://localhost:3000/user/signup', this.user).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.showSuccessNotification();
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Signup failed', error);
      }
    });
}



showSuccessNotification(): void {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'You have successfully Signed up',
    showConfirmButton: false,
    timer: 1500
  });
}
}
