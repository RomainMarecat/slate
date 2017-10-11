import { Component, TemplateRef, OnInit } from '@angular/core';
import { Clothing } from './../shared/clothing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'clothing-add',
  templateUrl: './clothing-add.component.html',
  styleUrls: ['./clothing-add.component.scss']
})
export class ClothingAddComponent implements OnInit {
  clothing: Clothing;
  payLoad = '';
  clothingForm: FormGroup;
  now: Date;
  disableDelivery: boolean;

  constructor(private fb: FormBuilder) {
    this.disableDelivery = false;
    this.createForm();
    this.now = new Date();
  }

  ngOnInit() {}

  createForm() {
    this.clothingForm = this.fb.group({
      external_url: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [''],
      delivery_fee: [{ value: '', disabled: this.disableDelivery }],
      delivery_free: [{ value: this.disableDelivery }],
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.clothingForm.value);
  }

  changeDeliveryFree(event) {
    this.disableDelivery = event.checked;
  }
}
