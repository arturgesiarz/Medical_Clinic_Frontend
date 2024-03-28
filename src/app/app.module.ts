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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CreatePatientComponent,
    ShowAllPatientComponent,
    DeletePatientComponent,
    EditPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
