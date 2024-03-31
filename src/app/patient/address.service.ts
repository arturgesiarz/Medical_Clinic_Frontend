import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryResponse} from "./country-response";
import {CityResponse} from "./city-response";
import {VoivodeshipResponse} from "./voivodeship-reponse";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getCountry(countryID: number): Observable<CountryResponse>  {
    return this.http.get<CountryResponse>('http://localhost:8080/api/address/country/' + countryID);
  }

  getCity(cityID: number): Observable<CityResponse>  {
    return this.http.get<CityResponse>('http://localhost:8080/api/address/city/' + cityID);
  }

  getVoivodeship(voivodeshipID: number): Observable<VoivodeshipResponse>  {
    return this.http.get<VoivodeshipResponse>('http://localhost:8080/api/address/voivodeship/' + voivodeshipID);
  }


}
