import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CreatePatientComponent } from './patient/create-patient/create-patient.component';
import { ShowAllPatientComponent } from './patient/show-all-patient/show-all-patient.component';
import { DeletePatientComponent } from './patient/delete-patient/delete-patient.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateTreatmentComponent } from './treatment/create-treatment/create-treatment.component';
import { RemoveTreatmentComponent } from './treatment/remove-treatment/remove-treatment.component';
import { ShowAllTreatmentComponent } from './treatment/show-all-treatment/show-all-treatment.component';
import { AssignForTreatmentComponent } from './treatment/assign-for-treatment/assign-for-treatment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreatePatientComponent,
    ShowAllPatientComponent,
    DeletePatientComponent,
    EditPatientComponent,
    CreateTreatmentComponent,
    RemoveTreatmentComponent,
    ShowAllTreatmentComponent,
    AssignForTreatmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
