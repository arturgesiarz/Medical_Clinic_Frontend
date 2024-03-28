import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreatePatientComponent} from "./patient/create-patient/create-patient.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'patient/add', component: CreatePatientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
