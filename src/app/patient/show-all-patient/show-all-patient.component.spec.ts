import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPatientComponent } from './show-all-patient.component';

describe('ShowAllPatientComponent', () => {
  let component: ShowAllPatientComponent;
  let fixture: ComponentFixture<ShowAllPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAllPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
