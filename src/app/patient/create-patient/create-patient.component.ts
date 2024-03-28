import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterPatientPayload} from "../register-patient.payload";
import {PatientServiceService} from "../patient-service.service";

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css'
})
export class CreatePatientComponent implements OnInit {
  registerPayload!: RegisterPatientPayload;
  registerForm!: FormGroup;
  creatingAccount: boolean = false;

  constructor(private router: Router, private registerService: PatientServiceService) {
    this.registerPayload = {
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
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      pesel: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      voivodeship: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      flatNumber: new FormControl('')
    });
  }

  register() {
    if(!this.creatingAccount) {
      this.creatingAccount = true;
      setTimeout(() => {
        this.registerPayload.firstName = this.registerForm.get('firstName')?.value;
        this.registerPayload.lastName = this.registerForm.get('lastName')?.value;
        this.registerPayload.pesel = this.registerForm.get('pesel')?.value;
        this.registerPayload.email = this.registerForm.get('email')?.value;
        this.registerPayload.phoneNumber = this.registerForm.get('phoneNumber')?.value;
        this.registerPayload.country = this.registerForm.get('country')?.value;
        this.registerPayload.city = this.registerForm.get('city')?.value;
        this.registerPayload.voivodeship = this.registerForm.get('voivodeship')?.value;
        this.registerPayload.zipCode = this.registerForm.get('zipCode')?.value;
        this.registerPayload.street = this.registerForm.get('street')?.value;
        this.registerPayload.flatNumber = this.registerForm?.get('flatNumber')?.value;

        this.registerService.register(this.registerPayload).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.creatingAccount = false;
      },1000)
    }


  }

}
