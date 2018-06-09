import { Component, Input, OnInit } from '@angular/core';
import { CarOffer } from '../../../shared/offer/offer';
import { Router } from '@angular/router';
import { Category } from '../../../shared/category/category';
import { CategoryService } from '../../../shared/category/category.service';
import { AlertService } from '../../../shared/popup/alert.service';
import * as moment from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-car-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {
  private _offer: CarOffer;

  brand: Category;

  model: Category;

  isFavorite = false;

  constructor(private router: Router,
              private categoryService: CategoryService,
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
    this._offer = offer;
    this._offer.published_at = moment(this._offer.published_at, 'x').format('DD/MM/YYYY HH:mm');
    this.getBrand(offer.brand);
    this.getModel(offer.model);
  }

  get offer() {
    return this._offer;
  }

  getBrand(key: string) {
    this.categoryService.getCategory(key)
      .pipe(
        take(1)
      )
      .subscribe(category => this.brand = category,
        err => this.alertService.toast(err));
  }

  getModel(key: string) {
    this.categoryService.getCategory(key)
      .pipe(
        take(1)
      )
      .subscribe(category => this.model = category,
        err => this.alertService.toast(err));
  }

  toggleFavorite(event: MouseEvent) {
    this.isFavorite = !this.isFavorite;
  }
}
