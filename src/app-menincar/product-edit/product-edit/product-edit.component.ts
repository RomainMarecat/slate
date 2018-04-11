import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/category/category.service';
import { Category } from '../../../shared/category/category';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { RangePipe } from 'ngx-pipes';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material';
import { CarProduct, mileages } from '../../../shared/product/car-product';
import { Location } from '@angular/common';
import { OfferService } from '../../../shared/offer/offer.service';
import { CarOffer, Offer } from '../../../shared/offer/offer';
import { AlertService } from '../../../shared/popup/alert.service';
import { ProductService } from '../../../shared/product/product.service';

@Component({
  selector: 'app-menincar-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: [ './product-edit.component.scss' ]
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;

  brands: Category[];
  models: Category[];
  nowYear = new Date().getFullYear();
  regDates: number[] = this.rangePipe.transform(this.nowYear - 70, 70 + 1);
  fuels: any[] = [];
  mileages: number[] = [];
  gearboxs: any[] = [];
  products: CarProduct[] = [];
  lat = 51.678418;
  lng = 7.809007;

  static getForm(): FormGroup {
    return new FormGroup({
      brand: new FormControl('', [ Validators.required ]),
      model: new FormControl({value: '', disabled: true}, [ Validators.required ]),
      product: new FormControl({value: '', disabled: true}, [ Validators.required ]),
      regDate: new FormControl('', [ Validators.required ]),
      mileage: new FormControl('', [ Validators.required ]),
      fuel: new FormControl(''),
      gearbox: new FormControl(''),
      reseller_type: new FormControl(''),
      // 'offer_type': new FormControl(''),
      description: new FormControl('', [ Validators.required, Validators.max(4000) ]),
      negotiable_price: new FormControl(false ),
      price: new FormControl('', [ Validators.required ]),
      images: new FormArray([
        new FormControl(null)
      ]),
      location: new FormControl('', [ Validators.required ]),
      user: new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl('')
      })
    });
  }

  constructor(public location: Location,
              private alertService: AlertService,
              private categoryService: CategoryService,
              private offerService: OfferService,
              private productService: ProductService,
              private rangePipe: RangePipe,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.form = ProductEditComponent.getForm();
    this.getBrands();
    this.getFuels();
    this.getGearboxs();
    this.mileages = mileages;
  }

  getCategories(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  getBrands() {
    this.categoryService.filters$.next([ {
      column: 'level',
      value: 1,
      operator: '=='
    } ]);
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.getCategories()
      .take(1)
      .subscribe((brands) => {
        this.brands = brands;
      });
  }

  getModels(brand: Category) {
    this.categoryService.filters$.next([
      {
        column: 'level',
        value: brand.level + 1,
        operator: '=='
      },
      {
        column: 'parent',
        value: brand.key,
        operator: '=='
      } ]);
    this.getCategories()
      .take(1)
      .subscribe((models) => {
        this.models = models;
        if (models.length === 0) {
          this.form.controls.model.disable();
        }
      });
  }

  getFuels() {
    this.translate.get([ 'fuel.gasoline', 'fuel.gasoil', 'fuel.electric', 'fuel.GPL', 'fuel.Hybrid' ])
      .subscribe((fuels) => {
        Object.entries(fuels).forEach(([ key, value ]) => {
          this.fuels.push(value);
        });
      });

  }

  getGearboxs() {
    this.translate.get([ 'gearbox.manual', 'gearbox.automatic' ])
      .subscribe((gearboxs) => {
        Object.entries(gearboxs).forEach(([ key, value ]) => {
          this.gearboxs.push(value);

        });
      });
  }

  getProducts(model: Category) {
    this.productService.filters$.next([
      {
        column: 'category',
        operator: '==',
        value: model.key
      }
    ]);
    this.productService
      .getProducts()
      .take(1)
      .subscribe((products: CarProduct[]) => {
        this.products = [...products];
        if (products.length > 0) {
          this.form.patchValue({ product: products[0]});
        } else {
          this.form.controls.product.disable();
          this.alertService.toast('error.model.product.empty');
        }
      });
  }

  onBrandChange(brand: MatSelectChange) {
    this.form.controls.model.enable();
    this.getModels(brand.value);
  }

  onModelChange(model: MatSelectChange) {
    this.form.controls.product.enable();
    this.getProducts(model.value);
  }

  onSubmit(event: any) {
    console.log('form value :', this.form.value, this.form.valid);
    Object.entries(this.form.controls).forEach(([ key, value ]) => {
      console.log(key, value.valid, value.errors);
    });

    const offer: CarOffer = this.form.value as CarOffer;
    if (this.form.valid) {
      this.offerService.createOffer(offer)
        .then((doc) => {
          this.alertService.toast('offer.saved' + doc.id);
        }, (err) => {
          this.alertService.toast(err);
        });
    }
  }
}
