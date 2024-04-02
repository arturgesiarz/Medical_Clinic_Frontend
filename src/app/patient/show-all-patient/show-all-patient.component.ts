import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TreatmentService} from "../../treatment/treatment.service";
import {PatientServiceService} from "../patient-service.service";
import {PatientPayload} from "../patient.payload";
import {PatientHistoryPayload} from "../patient-history.payload";
import {throwError} from "rxjs";
import {PatientBasicModel} from "../patient-basic-response";
import {AddressService} from "../address.service";
import {PatientAddressModel} from "../patient-address-response";
import {log} from "util";

@Component({
  selector: 'app-show-all-patient',
  templateUrl: './show-all-patient.component.html',
  styleUrl: './show-all-patient.component.css'
})
export class ShowAllPatientComponent implements OnInit {
  private patientsBasic: Array<PatientBasicModel> = [];
  private patientHistoryPayload: Array<PatientHistoryPayload> = []
  patients: Array<PatientPayload> = [];
  treatmentsHistory = new Map();

  constructor(private router: Router, private treatmentService: TreatmentService,
              private patientService: PatientServiceService, private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patientsBasic = data
    }, error => {
      throwError(error);
    })

    this.patientsBasic.forEach(patientBasic => {
      let patientPayload = new PatientPayload()
      let patientBasicAddress: PatientAddressModel = new PatientAddressModel();

      this.patientService.getPatientAddressDetails(patientBasic.patientID!).subscribe(data => {
        patientBasicAddress = data
        patientPayload.zipCode = patientBasicAddress.zipCode;
        patientPayload.street = patientBasicAddress.street;
        patientPayload.flatNumber = patientBasicAddress.flatNumber;
        patientPayload.country = patientBasicAddress.country?.country!;
        patientPayload.city = patientBasicAddress.city?.city!;
        patientPayload.voivodeship = patientBasicAddress.voivodeship?.voivodeship!;
      })

      patientPayload.patientID  = patientBasic.patientID;
      patientPayload.firstName = patientBasic.firstName;
      patientPayload.lastName = patientBasic.lastName;
      patientPayload.pesel = patientBasic.pesel;
      patientPayload.phoneNumber = patientBasic.phoneNumber;
      patientPayload.email = patientBasic.email;

      this.patients.push(patientPayload)
    });
  }


}
