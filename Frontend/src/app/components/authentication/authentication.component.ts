import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [NavbarComponent,FormsModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const userData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    // Make HTTP POST request for login
    this.http.post<any>('http://localhost:3000/user/login', userData).subscribe(
      (response) => {
        // Store token in local storage
        localStorage.setItem('token', response.token);
        console.log("Login Success");
        this.router.navigate(['/details']);
      },
      (error) => {
        // Handle error
        console.error("Login Error:", error);
      }
    );
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const userData = {
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      email: this.signupForm.value.email,
      name: this.signupForm.value.name
    };

    // Make HTTP POST request for signup
    this.http.post<any>('http://localhost:3000/user/signup', userData).subscribe(
      (response) => {
        console.log("Signup Success");
        // Optionally, you can automatically login the user after successful signup
        window.location.reload();
      },
      (error) => {
        // Handle error
        console.error("Signup Error:", error);
      }
    );
  }
  }

