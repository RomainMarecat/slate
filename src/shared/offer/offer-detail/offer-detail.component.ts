import { Component, Input, OnInit } from '@angular/core';
import { Offer } from '../offer';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss'],
})
export class OfferDetailComponent implements OnInit {
  @Input() offer: Offer;

  constructor() {
  }

  ngOnInit() {
  }

}
