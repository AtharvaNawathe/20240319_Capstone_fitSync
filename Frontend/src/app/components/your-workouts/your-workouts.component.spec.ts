import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourWorkoutsComponent } from './your-workouts.component';

describe('YourWorkoutsComponent', () => {
  let component: YourWorkoutsComponent;
  let fixture: ComponentFixture<YourWorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourWorkoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourWorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
