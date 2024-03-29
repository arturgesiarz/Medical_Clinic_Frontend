import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateTreatmentPayload} from "./create-treatment.payload";
import {TreatmentModel} from "./treatment-response";

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  constructor(private http: HttpClient) { }

  create(createTreatmentPayload: CreateTreatmentPayload): Observable<any>  {
    return this.http.post('http://localhost:8080/api/treatment/add',createTreatmentPayload);
  }

  getAllTreatment(): Observable<Array<TreatmentModel>> {
    return this.http.get<Array<TreatmentModel>>('http://localhost:8080/api/treatment/show-all');
  }

  deleteTreatment(treatmentID: number): Observable<any> {
    return this.http.post('http://localhost:8080/api/treatment/delete/' + treatmentID,"");
  }

}
