import { Component, TemplateRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from './../product';
import { IProduct } from './../i-product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Media } from './../../media/media';
import { UserService } from './../../user/user.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  @Output() productChange: EventEmitter < IProduct > ;
  product: IProduct;
  @Input('_user') _user: any;
  disableDelivery: boolean;
  isLoading: boolean;
  now: Date;
  @Output('_submit') _submit: EventEmitter < IProduct > ;
  image1: Media;
  image2: Media;
  image3: Media;

  constructor(private userService: UserService) {
    this.isLoading = false;
    this._submit = new EventEmitter < Product > ();
    this.productChange = new EventEmitter < Product > ();
    this.now = new Date();
    this.disableDelivery = false;
    this.image1 = new Media();
    this.image1.position = 1;
    this.image2 = new Media();
    this.image2.position = 2;
    this.image3 = new Media();
    this.image3.position = 3;
    this.product = new Product();
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.form.valid) {
      const product = { ...this.form.value as IProduct };
      product.published = false;
      if (product.external_url === 'http://') {
        product.external_url = null;
      }
      product.thumbnail = this.userService.getUser().photoURL;
      product.score = 0;
      this.submit(product);
    }
  }

  submit(product: IProduct) {
    this._submit.emit(product);
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
      .subscribe((product) => {
        this.productChange.emit(product);
      });
  }

  changeDeliveryFree(event) {
    this.disableDelivery = event.checked;
  }

  onImageChange(media: Media) {
    if (media.position === 1) {
      this.form.patchValue({ image1: media.public_id });
      this.product.image1 = media.public_id;
      this.productChange.emit(this.product);
    } else if (media.position === 2) {
      this.form.patchValue({ image2: media.public_id });
      this.product.image2 = media.public_id;
      this.productChange.emit(this.product);
    } else {
      this.form.patchValue({ image3: media.public_id });
      this.product.image3 = media.public_id;
      this.productChange.emit(this.product);
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
}
