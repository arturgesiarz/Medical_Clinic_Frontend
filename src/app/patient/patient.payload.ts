
export class PatientPayload {
  patientID?: number;
  firstName!: string;
  lastName!: string;
  pesel!: string;
  email!: string;
  phoneNumber!: string;
  country!: string;
  city!: string;
  voivodeship!: string;
  zipCode!: string;
  street!: string;
  flatNumber?: number;
  showTreatmentsOption: boolean = false;
  showAddressOption: boolean = false;
}
