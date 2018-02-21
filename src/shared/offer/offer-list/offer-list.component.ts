import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product/product';
import { OfferService } from '../offer.service';
import { Filter } from '../../facet/filter/shared/filter';
import { Offer } from '../offer';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  @Input() product: Product;
  offers: Offer[] = [];

  constructor(private offerService: OfferService, private alertService: AlertService) {}

  ngOnInit() {
    this.getOffers();
  }

  getOffers() {
    const filters: Filter[] = [
      { column: 'product', operator: '==', value: this.product.key }
    ];
    this.offerService.filters$.next(filters);
    this.offerService.getOffers().subscribe((offers: Offer[]) => {
      this.offers = offers;
    }, (err) => {
      this.alertService.toast('Les offres n\'ont pas été trouvées');
    });
  }
}
