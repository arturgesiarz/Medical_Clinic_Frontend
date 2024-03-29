import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CreateTreatmentPayload} from "../create-treatment.payload";
import {CreateTreatmentService} from "../create-treatment.service";

@Component({
  selector: 'app-create-treatment',
  templateUrl: './create-treatment.component.html',
  styleUrl: './create-treatment.component.css'
})
export class CreateTreatmentComponent implements OnInit{

  createTreatmentPayload!: CreateTreatmentPayload;
  createTreatmentForm!: FormGroup;
  creatingTreatment: boolean = false;

  constructor(private router: Router, private createTreatmentService: CreateTreatmentService) {
    this.createTreatmentPayload = {
      treatmentName: '',
      treatmentPrice: -1
    }
  }

  ngOnInit(): void {
    this.createTreatmentForm = new FormGroup({
      treatmentName: new FormControl('', Validators.required),
      treatmentPrice: new FormControl('')
    });
  }

  create() {
    if(!this.creatingTreatment) {
      this.creatingTreatment = true;
      setTimeout(() => {
        this.createTreatmentPayload.treatmentName = this.createTreatmentForm.get('treatmentName')?.value;
        this.createTreatmentPayload.treatmentPrice = this.createTreatmentForm.get('treatmentPrice')?.value;
        this.createTreatmentService.create(this.createTreatmentPayload).subscribe(() => {
        }, error => {
          if(error.status == 201){
            this.router.navigateByUrl('/');
          }
        })
        this.creatingTreatment = false;
      },1000)
    }


  }

}
