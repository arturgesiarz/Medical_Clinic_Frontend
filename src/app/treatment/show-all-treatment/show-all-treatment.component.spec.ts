import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTreatmentComponent } from './show-all-treatment.component';

describe('ShowAllTreatmentComponent', () => {
  let component: ShowAllTreatmentComponent;
  let fixture: ComponentFixture<ShowAllTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAllTreatmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowAllTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
