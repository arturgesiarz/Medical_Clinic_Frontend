import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignForTreatmentComponent } from './assign-for-treatment.component';

describe('AssignForTreatmentComponent', () => {
  let component: AssignForTreatmentComponent;
  let fixture: ComponentFixture<AssignForTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignForTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignForTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
