import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTreatmentPayload} from "./create-treatment.payload";

@Injectable({
  providedIn: 'root'
})
export class CreateTreatmentService {
  constructor(private http: HttpClient) { }

  create(createTreatmentPayload: CreateTreatmentPayload): Observable<any>  {
    return this.http.post('http://localhost:8080/api/treatment/add',createTreatmentPayload);
  }

}
