import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageProductComponent } from '../../../media/cloudinary/image-product/image-product.component';
import { Media } from '../../../media/media';
import { UserService } from '../../../user/shared/user.service';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @ViewChild(ImageProductComponent, {static: false}) imageProductComponent: ImageProductComponent;
  form: FormGroup;
  formDetail: FormGroup;
  formMedia: FormGroup;
  formAdditional: FormGroup;
  @Output() productChange: EventEmitter<Product> = new EventEmitter<Product>();
  product: Product;
  // tslint:disable
  @Input() _user: any;
  @Output() _submit: EventEmitter<Product> = new EventEmitter<Product>();
  // tslint:enable
  disableDelivery: boolean;
  isLoading: boolean;
  isLinear: boolean;
  now: Date;
  image1: Media;
  image2: Media;
  image3: Media;

  constructor(private userService: UserService) {
    this.isLoading = false;
    this.isLinear = true;
    this.now = new Date();
    this.disableDelivery = false;
    this.image1 = {} as unknown as Media;
    this.image1.position = 1;
    this.image2 = {} as unknown as Media;
    this.image2.position = 2;
    this.image3 = {} as unknown as Media;
    this.image3.position = 3;
    this.product = {} as unknown as Product;
  }

  ngOnInit() {
    this.createForm();
  }

  validateImage() {
    this.imageProductComponent.validateImage();
  }

  onSubmit() {
    if (this.form.valid &&
      this.formDetail &&
      this.formMedia &&
      this.formAdditional) {
      const product = {...this.formMedia.value, ...this.formDetail.value, ...this.formAdditional.value} as Product;
      product.published = false;
      product.thumbnail = this.userService.getUser().photoURL;
      product.user = this.userService.getUser().uid;
      product.creator = this.userService.getUser().displayName;
      product.score = 0;
      this.submit(product);
    }
  }

  submit(product: Product) {
    this._submit.emit(product);
  }

  createForm() {
    this.formDetail = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50)
      ])
    });

    this.formAdditional = new FormGroup({
      description: new FormControl('', [
        Validators.minLength(0),
        Validators.maxLength(2000)
      ]),
      external_url: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(250)
      ]),
      price: new FormControl('', [
        Validators.min(0),
        Validators.max(9999)
      ]),
      delivery_fee: new FormControl('', [
        Validators.min(0),
        Validators.max(9999)
      ]),
      delivery_free: new FormControl(false, []),
    });

    this.formMedia = new FormGroup({
      image1: new FormControl('', [
        Validators.required,
      ])
    });

    this.form = new FormGroup({
      media: this.formMedia,
      detail: this.formDetail,
      additional: this.formAdditional
    });

    this.formMedia.valueChanges.subscribe((product) => {
      this.productChange.emit(product);
    });
    this.formDetail.valueChanges.subscribe((product) => {
      this.productChange.emit(product);
    });
    this.formAdditional.valueChanges.subscribe((product) => {
      this.productChange.emit(product);
    });
  }

  changeDeliveryFree(event) {
    this.disableDelivery = event.checked;
  }

  onImageChange(media: Media) {
    if (media.position === 1) {
      this.formMedia.patchValue({image1: media.public_id});
      this.product.image1 = media.public_id;
      this.productChange.emit(this.product);
    } else if (media.position === 2) {
      this.formMedia.patchValue({image2: media.public_id});
      this.product.image2 = media.public_id;
      this.productChange.emit(this.product);
    } else {
      this.formMedia.patchValue({image3: media.public_id});
      this.product.image3 = media.public_id;
      this.productChange.emit(this.product);
    }
  }

  get name() {
    return this.formDetail.get('name');
  }

  get description() {
    return this.formAdditional.get('description');
  }

  get externalUrl() {
    return this.formAdditional.get('external_url');
  }

  get price() {
    return this.formAdditional.get('price');
  }

  get deliveryFee() {
    return this.formAdditional.get('delivery_fee');
  }

  get deliveryFree() {
    return this.formAdditional.get('delivery_free');
  }
}
