import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TreatmentService} from "../../treatment/treatment.service";
import {PatientServiceService} from "../patient-service.service";
import {PatientPayload} from "../patient.payload";
import {throwError} from "rxjs";
import {PatientBasicModel} from "../patient-basic-response";
import {PatientAddressModel} from "../patient-address-response";
import {PatientTreatmentHistoryModel} from "../patient-history-response";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-show-all-patient',
  templateUrl: './show-all-patient.component.html',
  styleUrl: './show-all-patient.component.css'
})
export class ShowAllPatientComponent implements OnInit {
  private patientsBasic: Array<PatientBasicModel> = [];
  patients: Array<PatientPayload> = [];
  treatmentsHistory: Map<number, Array<PatientTreatmentHistoryModel>> = new Map();
  faHide = faChevronUp;
  faShow = faChevronDown;

  constructor(private router: Router, private treatmentService: TreatmentService,
              private patientService: PatientServiceService) {
  }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patientsBasic = data
      this.addedAllInformation();
    }, error => {
      throwError(error);
    })
  }

  private addedAllInformation() {
    this.patientsBasic.forEach(patientBasic => {
      let patientPayload = new PatientPayload()
      let patientBasicAddress: PatientAddressModel = new PatientAddressModel();

      this.addedAddress(patientBasic, patientPayload, patientBasicAddress);
      this.addedBasicInformation(patientBasic, patientPayload);
      this.addedTreatments(patientBasic)
      this.patients.push(patientPayload)

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

  private addedTreatments(patientBasic: PatientBasicModel) {
    let patientHistoryPayload: Array<PatientTreatmentHistoryModel> = [];
    this.patientService.getPatientTreatmentHistoryDetails(patientBasic.patientID!).subscribe(data => {
      patientHistoryPayload = data;
      patientHistoryPayload.forEach(patientHistory => {
        let date = new Date(parseFloat(patientHistory.treatmentDate) * 1000)
        let forrmatedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        patientHistory.treatmentDate = forrmatedDate
      })

      this.treatmentsHistory.set(patientBasic.patientID!, patientHistoryPayload);
    })
  }

  showAddress(patientID: number) {
    this.patients.forEach(patient => {
      if(patient.patientID == patientID){
        patient.showAddressOption = true;
      }
    })
  }
  hideAddress(patientID: number) {
    this.patients.forEach(patient => {
      if(patient.patientID == patientID){
        patient.showAddressOption = false;
      }
    })
  }

  showTreatments(patientID: number) {
    this.patients.forEach(patient => {
      if(patient.patientID == patientID){
        patient.showTreatmentsOption = true;
      }
    })
  }
  hideTreatments(patientID: number) {
    this.patients.forEach(patient => {
      if(patient.patientID == patientID){
        patient.showTreatmentsOption = false;
      }
    })
  }

  hasTreatments(patientID: number) {
    if (this.treatmentsHistory.get(patientID) != null
      && this.treatmentsHistory.get(patientID)!.length > 0) {
      return true;
    } return false;
  }
}
