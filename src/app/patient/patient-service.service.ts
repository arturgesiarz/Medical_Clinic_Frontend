import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPatientPayload} from "./register-patient.payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  constructor(private http: HttpClient) { }
  register(registerPayload: RegisterPatientPayload): Observable<any>  {
    return this.http.post('http://localhost:8080/api/patients/add',registerPayload);
  }

}
