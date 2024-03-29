import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPatientPayload} from "./register-patient.payload";
import {Observable} from "rxjs";
import {PatientBasicModel} from "./patient-basic-response";

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

  deletePatient(patientID: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/patients/delete/' + patientID,"");
  }
}
