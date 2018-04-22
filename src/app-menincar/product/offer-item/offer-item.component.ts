import { Component, Input, OnInit } from '@angular/core';
import { CarOffer, Offer } from '../../../shared/offer/offer';
import { StringService } from '../../../shared/util/string.service';
import { Router } from '@angular/router';
import { Category } from '../../../shared/category/category';
import { CategoryService } from '../../../shared/category/category.service';
import { AlertService } from '../../../shared/popup/alert.service';

@Component({
  selector: 'app-car-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: [ './offer-item.component.scss' ]
})
export class OfferItemComponent implements OnInit {
  private _offer: CarOffer;

  brand: Category;

  model: Category;

  constructor(private router: Router, private categoryService: CategoryService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  offerDetail(event: any) {
    this.router.navigate([
      '/offer/' +
      this.offer.key
    ]);
  }

  @Input('offer') set offer(offer) {
    console.log('offer', offer);
    this._offer = offer;
    this.getBrand(offer.brand);
    this.getModel(offer.model);
  }

  get offer() {
    return this._offer;
  }

  getBrand(key: string) {
    this.categoryService.getCategory(key)
      .take(1)
      .subscribe(category => this.brand = category,
        err => this.alertService.toast(err));
  }

  getModel(key: string) {
    this.categoryService.getCategory(key)
      .take(1)
      .subscribe(category => this.model = category,
        err => this.alertService.toast(err));
  }
}
