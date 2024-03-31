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
      let patientBasicAddress!: PatientAddressModel;

      this.patientService.getPatientAddressDetails(patientBasic.patientID!).subscribe(data => {
        patientBasicAddress = data
      })

      patientPayload.patientID  = patientBasic.patientID;
      patientPayload.firstName = patientBasic.firstName;
      patientPayload.lastName = patientBasic.lastName;
      patientPayload.pesel = patientBasic.pesel;
      patientPayload.phoneNumber = patientBasic.phoneNumber;
      patientPayload.email = patientBasic.email;

      this.addressService.getCountry(patientBasicAddress.countryID!).subscribe(data => {
        patientPayload.country = data.country;
      })

      this.addressService.getCity(patientBasicAddress.cityID!).subscribe(data => {
        patientPayload.city = data.city;
      })

      this.addressService.getVoivodeship(patientBasicAddress.voivodeshipID!).subscribe(data => {
        patientPayload.voivodeship = data.voivodeship;
      })

      patientPayload.zipCode = patientBasicAddress.zipCode;
      patientPayload.street = patientBasicAddress.street;
      patientPayload.flatNumber = patientBasicAddress.flatNumber;

      this.patients.push(patientPayload)
    });
  }


}
