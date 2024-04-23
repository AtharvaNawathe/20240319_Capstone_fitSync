import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { Router, RouterModule} from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule],
      declarations: [] 
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty username and password', () => {
    expect(component.user.username).toBe('');
    expect(component.user.password).toBe('');
  });

  it('should render login form with required elements', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[type="text"]')).toBeTruthy(); 
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy(); 
    expect(compiled.querySelector('button[type="submit"]')).toBeTruthy(); 
  });

  it('should call login method when form is submitted with valid credentials', fakeAsync(() => {
    spyOn(component, 'login');
    const compiled = fixture.nativeElement;
    const usernameInput = compiled.querySelector('input[type="text"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const loginButton = compiled.querySelector('button[type="submit"]');

    usernameInput.value = 'testuser';
    passwordInput.value = 'password';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    loginButton.click();
    tick(); 
    expect(component.login).toHaveBeenCalled();
  }));
});
