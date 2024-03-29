import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TreatmentService} from "../treatment.service";
import {PatientServiceService} from "../../patient/patient-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TreatmentModel} from "../treatment-response";
import {PatientBasicModel} from "../../patient/patient-basic-response";
import {throwError} from "rxjs";

@Component({
  selector: 'app-assign-for-treatment',
  templateUrl: './assign-for-treatment.component.html',
  styleUrl: './assign-for-treatment.component.css'
})
export class AssignForTreatmentComponent implements OnInit {
  assignForTreatmentForm!: FormGroup;
  patients: Array<PatientBasicModel> = [];
  treatments: Array<TreatmentModel> = [];
  assining: boolean = false;

  constructor(private router: Router, private treatmentService: TreatmentService,
              private patientService: PatientServiceService) {
  }

  ngOnInit(): void {
    this.assignForTreatmentForm = new FormGroup({
      patientID: new FormControl('', Validators.required),
      treatmentID: new FormControl('', Validators.required),
    });
    this.treatmentService.getAllTreatment().subscribe(data => {
      this.treatments = data
    }, error => {
      throwError(error);
    })
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data
    }, error => {
      throwError(error);
    })
  }

  assign() {
    if(!this.assining) {
      this.assining = true;

      setTimeout(() => {
        this.treatmentService.assign(this.assignForTreatmentForm.get('patientID')?.value
          ,this.assignForTreatmentForm.get('treatmentID')?.value).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.assining = false;
      },1000)
    }
  }


}
