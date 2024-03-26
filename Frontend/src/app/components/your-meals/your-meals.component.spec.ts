import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourMealsComponent } from './your-meals.component';

describe('YourMealsComponent', () => {
  let component: YourMealsComponent;
  let fixture: ComponentFixture<YourMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourMealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
