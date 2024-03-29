import {Component, OnInit} from '@angular/core';
import {TreatmentModel} from "../treatment-response";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TreatmentService} from "../treatment.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-remove-treatment',
  templateUrl: './remove-treatment.component.html',
  styleUrl: './remove-treatment.component.css'
})
export class RemoveTreatmentComponent implements OnInit {
  treatments: Array<TreatmentModel> = [];
  deleteTreatmentForm!: FormGroup;
  deletingTreatment: boolean = false;

  constructor(private router: Router, private treatmentService: TreatmentService) {
  }

  ngOnInit(): void {
    this.deleteTreatmentForm = new FormGroup({
      treatmentID: new FormControl('', Validators.required),
    });
    this.treatmentService.getAllTreatment().subscribe(data => {
      this.treatments = data
    }, error => {
      throwError(error);
    })
  }

  delete() {
    if(!this.deletingTreatment) {
      this.deletingTreatment = true;

      setTimeout(() => {
        this.treatmentService.deleteTreatment(this.deleteTreatmentForm.get('treatmentID')?.value).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.deletingTreatment = false;
      },1000)
    }
  }
}
