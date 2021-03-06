import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { TranslateService } from '@ngx-translate/core';
import { RangePipe } from 'ngx-pipes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Category } from '../../../shared/category/category';
import { CategoryService } from '../../../shared/category/category.service';
import { DeviceService } from '../../../shared/device/device.service';
import { GeocodeService } from '../../../shared/map/shared/geocode.service';
import { Marker } from '../../../shared/map/shared/map';
import { Media } from '../../../shared/media/media';
import { CarOffer } from '../../../shared/offer/offer';
import { OfferService } from '../../../shared/offer/offer.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { CarProduct, mileages } from '../../../shared/product/shared/car-product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-car-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.scss']
})
export class OfferEditComponent implements OnInit {

  form: FormGroup;

  brands: Category[];
  models: Category[];
  nowYear = new Date().getFullYear();
  regDates: number[] = this.rangePipe.transform(this.nowYear - 70, 70 + 1);
  fuels: any[] = [];
  mileages: number[] = [];
  gearboxs: any[] = [];
  products: CarProduct[] = [];
  mapConfig = {
    lat: 45.97215152618962,
    lng: 2.61474609375,
    zoom: 6,
    disableDefaultUI: false,
    zoomControl: false,
    streetViewControl: false,
    markerDraggable: true
  };
  marker: Marker = null;
  isSaving = false;
  _address = 'Paris';
  imageStorageConfig: any;
  downloadURL: string;

  static getForm(): FormGroup {
    return new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl({value: '', disabled: true}, [Validators.required]),
      product: new FormControl({value: '', disabled: true}, [Validators.required]),
      regDate: new FormControl('', [Validators.required]),
      mileage: new FormControl('', [Validators.required]),
      fuel: new FormControl(''),
      gearbox: new FormControl(''),
      reseller_type: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.max(4000)]),
      negotiable_price: new FormControl(false),
      price: new FormControl('', [Validators.required]),
      images: new FormArray([]),
      location: new FormGroup({
        latitude: new FormControl(null, [Validators.required]),
        longitude: new FormControl(null, [Validators.required]),
        street_address: new FormControl(null, []),
        postal_code: new FormControl(null, []),
        route: new FormControl(null, []),
        locality: new FormControl(null, []),
        department: new FormControl(null, []),
        region: new FormControl(null, []),
        country: new FormControl(null, []),
      }),
      user: new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required])
      })
    });
  }

  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private offerService: OfferService,
              private deviceService: DeviceService,
              private categoryService: CategoryService,
              public location: Location,
              private alertService: AlertService,
              private rangePipe: RangePipe,
              private translate: TranslateService,
              private geocodeService: GeocodeService,
              private ref: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit() {
    this.form = OfferEditComponent.getForm();
    this.getBrands();
    this.getFuels();
    this.getGearboxs();
    this.createImageStorageConfig();
    this.getOffer();
    this.mileages = mileages;
  }

  getOffer() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        this.offerService.getOffer(value.key)
          .subscribe((offer: CarOffer) => {
            this.form.patchValue(offer);
          });
      }
    });
  }

  createImageStorageConfig() {
    this.imageStorageConfig = {
      model: '',
      alt: '',
    };
  }

  getCategories(): Observable<Category[]> {
    return this.categoryService.getCategories();
  }

  getBrands() {
    this.categoryService.filters$.next([{
      column: 'level',
      value: 1,
      operator: '=='
    }]);
    this.categoryService.orderBy$.next({column: 'name', direction: 'asc'});
    this.getCategories()
      .pipe(
        take(1)
      )
      .subscribe((brands) => {
        this.brands = brands;
      }, (err) => {
        this.alertService.show(err);
        this.brands = [];
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
      }]);
    this.getCategories()
      .pipe(
        take(1)
      )
      .subscribe((models) => {
        this.models = models;
        if (models.length === 0) {
          this.form.controls.model.disable();
        }
      });
  }

  getFuels() {
    this.translate.get(['fuel.gasoline', 'fuel.gasoil', 'fuel.electric', 'fuel.GPL', 'fuel.Hybrid'])
      .subscribe((fuels) => {
        Object.entries(fuels).forEach(([key, value]) => {
          this.fuels.push(value);
        });
      });

  }

  getGearboxs() {
    this.translate.get(['gearbox.manual', 'gearbox.automatic'])
      .subscribe((gearboxs) => {
        Object.entries(gearboxs).forEach(([key, value]) => {
          this.gearboxs.push(value);
        });
      });
  }

  getProducts(model: Category) {
    this.productService.filters$.next([
      {
        column: 'model',
        operator: '==',
        value: model.key
      }
    ]);
    this.productService
      .getProducts()
      .pipe(
        take(1)
      )
      .subscribe((products: CarProduct[]) => {
        this.products = [...products];
        if (products.length > 0) {
          this.form.patchValue({product: products[0]});
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

  onMapClick(event: {coords: {lat: number, lng: number}}) {
    this.marker = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: 'offer-edit.label.meeting',
      draggable: true
    };
    this.getAddress(this.marker.lat, this.marker.lng);
  }

  markerDragEnd(marker: Marker) {
    this.getAddress(marker.lat, marker.lng);
  }

  onAddressChange(address: string) {
    this.geocodeService.geocodeAddress(address)
      .subscribe(
        (location) => {
          this.mapConfig.lat = location.lat;
          this.mapConfig.lng = location.lng;
          this.marker = {
            lat: location.lat,
            lng: location.lng,
            label: 'offer-edit.label.meeting',
            draggable: true
          };
          this.ref.detectChanges();
          this.getAddress(location.lat, location.lng);
        }
      );
  }

  onSubmit(event: any) {
    this.isSaving = true;
    if (this.form.valid) {
      const offer: CarOffer = this.form.value as CarOffer;
      offer.brand = this.form.value.brand.key;
      offer.model = this.form.value.model.key;
      offer.product = this.form.value.product.key;
      offer.published = true;
      offer.published_at = Math.floor(Date.now() / 1000) as unknown as any;
      this.offerService.createOffer(offer)
        .then((doc) => {
          this.translate.get('offer-edit.message.offer.saved')
            .subscribe((translated) => {
              this.alertService.toast(translated);
              this.reset();
              this.isSaving = false;
              this.router.navigate([`/offer/${doc.id}/confirmation`]);
            });
        }, (err) => {
          this.alertService.toast(err);
          this.isSaving = false;
        });
    } else {
      this.isSaving = false;
    }
  }

  getAddress(lat: number, lng: number) {
    this.geocodeService.geocodeLatLng(lat, lng)
      .subscribe((location) => {
        if (!location.error) {
          this.form.patchValue({
            location: {
              ...location,
              ...{
                latitude: lat,
                longitude: lng
              }
            }
          });
        }
      });
  }

  /**
   * image change function of emitter
   */
  onImageChange(media: Media) {
    const control = this.form.controls.images as FormArray;
    // add new formControl
    control.push(this.createImage(media));
  }

  /**
   * Form Array pusher
   */
  createImage(media: Media): FormControl {
    return new FormControl(media.key);
  }

  /**
   * On change download url
   */
  onImageRefChanged(task: UploadTaskSnapshot) {
    task.ref.getDownloadURL().then((downloadURL => {
        this.downloadURL = downloadURL;
      }),
      (err) => {
        this.alertService.show(err);
      });
  }

  /**
   * reset the form control
   */
  reset() {
    this.form.reset({
      brand: '',
      model: '',
      product: '',
      regDate: '',
      mileage: '',
      fuel: '',
      gearbox: '',
      reseller_type: '',
      description: '',
      negotiable_price: false,
      price: '',
      images: [],
      location: {
        latitude: null,
        longitude: null,
      },
      user: {
        username: '',
        email: '',
        phone: ''
      }
    });
  }
}
