import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Offer} from '../offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss'],
  encapsulation: ViewEncapsulation.Native
})
export class OfferDetailComponent implements OnInit {
  @Input() offer: Offer;

  constructor() {
  }

  ngOnInit() {
  }

}
