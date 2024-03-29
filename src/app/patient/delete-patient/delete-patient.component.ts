import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PatientServiceService} from "../patient-service.service";
import {PatientBasicModel} from "../patient-basic-response";
import {throwError} from "rxjs";

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.css'
})
export class DeletePatientComponent implements OnInit{
  patients: Array<PatientBasicModel> = [];
  patientPayload!: PatientBasicModel;
  deletePatientForm!: FormGroup;
  deletingPatient: boolean = false;

  constructor(private router: Router, private patientService: PatientServiceService) {
    this.patientPayload = {
      firstName: '',
      lastName: '',
      pesel: '',
      phoneNumber: '',
      email: ''
    }
  }

  ngOnInit(): void {
    this.deletePatientForm = new FormGroup({
      patientID: new FormControl('', Validators.required),
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data
    }, error => {
      throwError(error);
    })
  }
  delete() {
    if(!this.deletingPatient) {
      this.deletingPatient = true;

      setTimeout(() => {
        this.patientService.deletePatient(this.deletePatientForm.get('patientID')?.value).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.deletingPatient = false;
      },1000)
    }
  }
}
