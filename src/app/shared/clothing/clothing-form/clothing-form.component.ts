import { Component, TemplateRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Clothing } from './../clothing';
import { IClothing } from './../i-clothing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Media } from './../../media/media';

@Component({
  selector: 'app-clothing-form',
  templateUrl: './clothing-form.component.html',
  styleUrls: ['./clothing-form.component.scss']
})
export class ClothingFormComponent implements OnInit {
  form: FormGroup;
  @Output() clothingChange: EventEmitter < IClothing > ;
  clothing: IClothing;
  @Input('_user') _user: any;
  disableDelivery: boolean;
  now: Date;
  @Output('_submit') _submit: EventEmitter < IClothing > ;
  image1: Media;
  image2: Media;
  image3: Media;

  constructor() {
    this._submit = new EventEmitter < Clothing > ();
    this.clothingChange = new EventEmitter < Clothing > ();
    this.now = new Date();
    this.disableDelivery = false;
    this.image1 = new Media();
    this.image1.position = 1;
    this.image2 = new Media();
    this.image2.position = 2;
    this.image3 = new Media();
    this.image3.position = 3;
    this.clothing = new Clothing();
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.clothing = { ...this.form.value as IClothing };
      this.clothing.published = false;
      this.clothing.created_at = this.now;
      this.submit();
    }
  }

  createForm() {
    this.form = new FormGroup({
      'external_url': new FormControl('http://', [
        Validators.minLength(6),
        Validators.maxLength(250)
      ]),
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ]),
      'description': new FormControl('', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(2000)
      ]),
      'price': new FormControl(0, [
        Validators.min(0),
        Validators.max(9999)
      ]),
      'delivery_fee': new FormControl(0, [
        Validators.min(0),
        Validators.max(9999)
      ]),
      'delivery_free': new FormControl(false, []),
      'image1': new FormControl('', [
        Validators.required,
      ]),
      'image2': new FormControl('', []),
      'image3': new FormControl('', []),
    });
    this.form.valueChanges
      .subscribe((clothing) => {
        console.log(this.form);
        this.clothingChange.emit(clothing);
      });
  }

  changeDeliveryFree(event) {
    this.disableDelivery = event.checked;
  }

  onImageChange(media: Media) {
    console.log(media);
    if (media.position === 1) {
      this.form.patchValue({ image1: media.public_id });
      this.clothing.image1 = media.public_id;
      this.clothingChange.emit(this.clothing);
    } else if (media.position === 2) {
      this.form.patchValue({ image2: media.public_id });
      this.clothing.image2 = media.public_id;
      this.clothingChange.emit(this.clothing);
    } else {
      this.form.patchValue({ image3: media.public_id });
      this.clothing.image3 = media.public_id;
      this.clothingChange.emit(this.clothing);
    }
  }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get externalUrl() {
    return this.form.get('external_url');
  }

  get price() {
    return this.form.get('price');
  }

  get deliveryFee() {
    return this.form.get('delivery_fee');
  }

  get deliveryFree() {
    return this.form.get('delivery_free');
  }

  submit() {
    this._submit.emit(this.clothing);
  }
}
