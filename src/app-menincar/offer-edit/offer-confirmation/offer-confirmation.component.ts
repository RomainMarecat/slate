import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OfferService } from '../../../shared/offer/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarOffer } from '../../../shared/offer/offer';
import { ProductService } from '../../../shared/product/product.service';
import { Location } from '@angular/common';
import { CategoryService } from '../../../shared/category/category.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { DeviceService } from '../../../shared/device/device.service';
import { Meta, Title } from '@angular/platform-browser';
import { GeocodeService } from '../../../shared/map/shared/geocode.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '../../../shared/category/category';

@Component({
  selector: 'app-menincar-offer-confirmation',
  templateUrl: './offer-confirmation.component.html',
  styleUrls: [ './offer-confirmation.component.scss' ]
})
export class OfferConfirmationComponent implements OnInit {

  offer: CarOffer;
  brand: Category;
  model: Category;

  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private offerService: OfferService,
              private deviceService: DeviceService,
              private categoryService: CategoryService,
              public location: Location,
              private alertService: AlertService,
              private translate: TranslateService,
              private geocodeService: GeocodeService,
              private router: Router) {
  }

  ngOnInit() {
    this.getOffer();
  }

  getOffer() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        this.offerService.getOffer(value.key)
          .subscribe((offer: CarOffer) => {
            this.meta.addTag({name: 'description', content: offer.description});
            if (offer.brand) {
              this.getBrand(offer.brand);
            }
            if (offer.model) {
              this.getModel(offer.model);
            }
            this.title.setTitle(this.title.getTitle() + ' ' + offer.mileage + ' km');

            this.offer = offer;
          });
      }
    });
  }

  getBrand(key: string) {
    this.categoryService.getCategory(key)
      .subscribe((brand) => {
        this.title.setTitle(brand.name + ' ' + this.title.getTitle());
        this.brand = brand;
      });
  }

  getModel(key: string) {
    this.categoryService.getCategory(key)
      .subscribe((model) => {
        this.title.setTitle(this.title.getTitle() + ' ' + model.name);
        this.model = model;
      });
  }

}
