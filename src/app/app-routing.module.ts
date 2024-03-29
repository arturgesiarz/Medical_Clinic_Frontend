import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreatePatientComponent} from "./patient/create-patient/create-patient.component";
import {CreateTreatmentComponent} from "./treatment/create-treatment/create-treatment.component";
import {DeletePatientComponent} from "./patient/delete-patient/delete-patient.component";
import {RemoveTreatmentComponent} from "./treatment/remove-treatment/remove-treatment.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'patient/add', component: CreatePatientComponent},
  {path: 'treatment/add', component: CreateTreatmentComponent},
  {path: 'patient/delete', component: DeletePatientComponent},
  {path: 'treatment/delete', component: RemoveTreatmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
