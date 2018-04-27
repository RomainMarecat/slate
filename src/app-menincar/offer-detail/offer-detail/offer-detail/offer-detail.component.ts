import { Component, OnInit } from '@angular/core';
import { CarProduct } from '../../../../shared/product/car-product';
import { Category } from '../../../../shared/category/category';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../shared/product/product.service';
import { DeviceService } from '../../../../shared/device/device.service';
import { AlertService } from '../../../../shared/popup/alert.service';
import { CategoryService } from '../../../../shared/category/category.service';
import { OfferService } from '../../../../shared/offer/offer.service';
import { CarOffer } from '../../../../shared/offer/offer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-car-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: [ './offer-detail.component.scss' ]
})
export class OfferDetailComponent implements OnInit {
  offer: CarOffer;
  product: CarProduct;
  brand: Category;
  model: Category;

  // User comments
  comments: Comment[] = [];

  resizedImage: {
    height: number,
  };
  items: any[];

  /**
   *
   * @param {Meta} meta
   * @param {Title} title
   * @param {ActivatedRoute} activatedRoute
   * @param {ProductService} productService
   * @param offerService
   * @param {DeviceService} deviceService
   * @param {AlertService} alertService
   * @param categoryService
   * @param translate
   */
  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private offerService: OfferService,
              private deviceService: DeviceService,
              private alertService: AlertService,
              private categoryService: CategoryService,
              private translate: TranslateService) {
    this.resizedImage = {height: 400};
  }

  ngOnInit() {
    this.getOffer();
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
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
            this.items = [
              {label: 'fuel.label', value: offer.fuel},
              {label: 'gearbox.label', value: offer.gearbox},
              {label: 'mileage', value: offer.mileage},
              {label: 'regDate', value: offer.regDate},
              {
                label: 'negotiable_price',
                value: offer.negotiable_price === true ? this.translate.instant('yes') : this.translate.instant('no')
              },
            ];
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

  sendMessage() {

  }

  sendEmail() {

  }

  showPhone() {

  }
}
