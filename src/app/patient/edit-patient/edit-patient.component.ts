import {Component, OnInit} from '@angular/core';
import {RegisterPatientPayload} from "../register-patient.payload";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {PatientServiceService} from "../patient-service.service";
import {PatientBasicModel} from "../patient-basic-response";
import {throwError} from "rxjs";
import {PatientPayload} from "../patient.payload";
import {PatientAddressModel} from "../patient-address-response";

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css'
})
export class EditPatientComponent implements OnInit {
  private patientsPayload: Array<PatientPayload> = [];
  editPayload!: RegisterPatientPayload;
  editForm!: FormGroup;
  editingAccount: boolean = false;
  patients: Array<PatientBasicModel> = [];

  constructor(private router: Router, private patientService: PatientServiceService) {
    this.editPayload = {
      firstName: '',
      lastName: '',
      pesel: '',
      email: '',
      phoneNumber: '',
      country: '',
      city: '',
      voivodeship: '',
      zipCode: '',
      street: '',
      flatNumber: -1
    }
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      patientID: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      voivodeship: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      flatNumber: new FormControl('')
    });
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data
      this.addedAllInformation();
    }, error => {
      throwError(error);
    })
  }

  private addedAllInformation() {
    this.patients.forEach(patientBasic => {
      let patientPayload = new PatientPayload()
      let patientBasicAddress: PatientAddressModel = new PatientAddressModel();

      this.addedAddress(patientBasic, patientPayload, patientBasicAddress);
      this.addedBasicInformation(patientBasic, patientPayload);
      this.patientsPayload.push(patientPayload)

    });
  }

  private addedAddress(patientBasic: PatientBasicModel, patientPayload: PatientPayload, patientBasicAddress: PatientAddressModel) {
    this.patientService.getPatientAddressDetails(patientBasic.patientID!).subscribe(data => {
      patientBasicAddress = data
      patientPayload.zipCode = patientBasicAddress.zipCode;
      patientPayload.street = patientBasicAddress.street;
      patientPayload.flatNumber = patientBasicAddress.flatNumber;
      patientPayload.country = patientBasicAddress.country?.country!;
      patientPayload.city = patientBasicAddress.city?.city!;
      patientPayload.voivodeship = patientBasicAddress.voivodeship?.voivodeship!;
    })
  }
  private addedBasicInformation(patientBasic: PatientBasicModel, patientPayload: PatientPayload) {
    patientPayload.patientID  = patientBasic.patientID;
    patientPayload.firstName = patientBasic.firstName;
    patientPayload.lastName = patientBasic.lastName;
    patientPayload.pesel = patientBasic.pesel;
    patientPayload.phoneNumber = patientBasic.phoneNumber;
    patientPayload.email = patientBasic.email;
  }

  edit() {
    if(!this.editingAccount) {
      this.editingAccount = true;
      setTimeout(() => {
        this.editPayload.firstName = this.editForm.get('firstName')?.value;
        this.editPayload.lastName = this.editForm.get('lastName')?.value;
        this.editPayload.email = this.editForm.get('email')?.value;
        this.editPayload.phoneNumber = this.editForm.get('phoneNumber')?.value;
        this.editPayload.country = this.editForm.get('country')?.value;
        this.editPayload.city = this.editForm.get('city')?.value;
        this.editPayload.voivodeship = this.editForm.get('voivodeship')?.value;
        this.editPayload.zipCode = this.editForm.get('zipCode')?.value;
        this.editPayload.street = this.editForm.get('street')?.value;
        this.editPayload.flatNumber = this.editForm?.get('flatNumber')?.value;

        this.patientService.editPatient(this.editForm.get('patientID')?.value,this.editPayload).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.editingAccount = false;
      },1000)
    }


  }

  fillFormFields() {
    const selectedPatientID = this.editForm.get('patientID')?.value;
    if (selectedPatientID) {
      this.patientsPayload.forEach(patient => {
        if (patient.patientID == selectedPatientID) {
          this.editForm.patchValue({
            firstName: patient.firstName,
            lastName: patient.lastName,
            phoneNumber: patient.phoneNumber,
            email: patient.email,
            country: patient.country,
            city: patient.city,
            voivodeship: patient.voivodeship,
            zipCode: patient.zipCode,
            street: patient.street,
            flatNumber: patient.flatNumber
          });
        }
      })
    }
  }
}
