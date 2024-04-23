import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealsComponent } from './add-meals.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddMealsComponent', () => {
  let component: AddMealsComponent;
  let fixture: ComponentFixture<AddMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMealsComponent,HttpClientTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
