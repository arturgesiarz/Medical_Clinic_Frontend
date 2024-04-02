import {PatientBasicModel} from "./patient-basic-response";
import {TreatmentModel} from "../treatment/treatment-response";

export class PatientTreatmentHistoryModel {
  treatmentHistoryID?: number;
  patient?: PatientBasicModel;
  treatment?: TreatmentModel;
  treatmentDate!: string;
  itTookPlace!: boolean;

}
