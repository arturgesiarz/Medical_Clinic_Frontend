import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPatientPayload} from "./register-patient.payload";
import {Observable} from "rxjs";
import {PatientBasicModel} from "./patient-basic-response";
import {PatientAddressModel} from "./patient-address-response";
import {PatientTreatmentHistoryModel} from "./patient-history-response";

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  constructor(private http: HttpClient) { }
  register(registerPayload: RegisterPatientPayload): Observable<any>  {
    return this.http.post('http://localhost:8080/api/patients/add',registerPayload);
  }

  getAllPatients(): Observable<Array<PatientBasicModel>> {
    return this.http.get<Array<PatientBasicModel>>('http://localhost:8080/api/patients/show-all');
  }

  getPatientBasicDetails(patientID: number): Observable<PatientBasicModel> {
    return this.http.get<PatientBasicModel>('http://localhost:8080/api/patients/show-user-details/' + patientID);
  }
  getPatientAddressDetails(patientID: number): Observable<PatientAddressModel> {
    return this.http.get<PatientAddressModel>('http://localhost:8080/api/patients/show-address-details/' + patientID);
  }

  getPatientTreatmentHistoryDetails(patientID: number): Observable<Array<PatientTreatmentHistoryModel>>{
    return this.http.get<Array<PatientTreatmentHistoryModel>>('http://localhost:8080/api/patients/show-treatment-history-details/' + patientID);
  }

  deletePatient(patientID: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/patients/delete/' + patientID,"");
  }

  editPatient(patientID: number, editPayLoad: RegisterPatientPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/patients/edit/' + patientID,editPayLoad);
  }
}
