import {PatientBasicModel} from "./patient-basic-response";
import {CountryResponse} from "./country-response";
import {CityResponse} from "./city-response";
import {VoivodeshipResponse} from "./voivodeship-reponse";

export class PatientAddressModel {
  addressID?: number;
  patient?: PatientBasicModel;
  country?: CountryResponse;
  city?: CityResponse;
  voivodeship?: VoivodeshipResponse;
  zipCode!: string;
  street!: string;
  flatNumber!: number;

}
