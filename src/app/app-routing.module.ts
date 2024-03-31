import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreatePatientComponent} from "./patient/create-patient/create-patient.component";
import {CreateTreatmentComponent} from "./treatment/create-treatment/create-treatment.component";
import {DeletePatientComponent} from "./patient/delete-patient/delete-patient.component";
import {RemoveTreatmentComponent} from "./treatment/remove-treatment/remove-treatment.component";
import {ShowAllTreatmentComponent} from "./treatment/show-all-treatment/show-all-treatment.component";
import {AssignForTreatmentComponent} from "./treatment/assign-for-treatment/assign-for-treatment.component";
import {ShowAllPatientComponent} from "./patient/show-all-patient/show-all-patient.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'patient/add', component: CreatePatientComponent},
  {path: 'treatment/add', component: CreateTreatmentComponent},
  {path: 'patient/delete', component: DeletePatientComponent},
  {path: 'treatment/delete', component: RemoveTreatmentComponent},
  {path: 'treatment/show-all', component: ShowAllTreatmentComponent},
  {path: 'treatment/assign', component: AssignForTreatmentComponent},
  {path: 'patient/show-all', component: ShowAllPatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
