import {Component, OnInit} from '@angular/core';
import {TreatmentModel} from "../treatment-response";
import {Router} from "@angular/router";
import {TreatmentService} from "../treatment.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-show-all-treatment',
  templateUrl: './show-all-treatment.component.html',
  styleUrl: './show-all-treatment.component.css'
})
export class ShowAllTreatmentComponent implements OnInit{
  treatments: Array<TreatmentModel> = [];

  constructor(private router: Router, private treatmentService: TreatmentService) {
  }

  ngOnInit(): void {
    this.treatmentService.getAllTreatment().subscribe(data => {
      this.treatments = data
    }, error => {
      throwError(error);
    })
  }

}
