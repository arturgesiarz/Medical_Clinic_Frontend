import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigateByUrl('/patient/add');
  }


  goToCreateTreatment() {
    this.router.navigateByUrl('treatment/add');
  }

  deletePatient() {
    this.router.navigateByUrl('patient/delete');
  }

  deleteTreatment() {
    this.router.navigateByUrl('treatment/delete');
  }

  showAllTreatment() {
    this.router.navigateByUrl('treatment/show-all');
  }
}
