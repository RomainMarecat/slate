import { Component, OnInit } from '@angular/core';
import { Price } from '../../shared/price';

@Component({
  selector: 'app-pricing-style1',
  templateUrl: './pricing-style1.component.html',
  styleUrls: [ './pricing-style1.component.scss' ]
})
export class PricingStyle1Component implements OnInit {

  pricings: Price[] = [
    {
      name: 'Developer',
      description: 'For New Developers',
      price: 0,
      options: [
        '10GB of Bandwidth',
        'Max 50 connection',
        '512MB RAM',
        'Unlimited access',
        'Unlimited User',
        'Data analytics'
      ]
    },
    {
      name: 'Starter',
      description: 'For Professional Developers',
      price: 30,
      selected: true,
      options: [
        '100GB of Bandwidth',
        'Max 500 connection',
        '1GB RAM',
        'Unlimited access',
        'Unlimited User',
        'Data analytics'
      ]
    },
    {
      name: 'Business',
      description: 'For Small Businesses',
      price: 60,
      options: [
        '100GB of Bandwidth',
        'Max 1500 connection',
        '2GB RAM',
        'Unlimited access',
        'Unlimited User',
        'Data analytics'
      ]
    },
    {
      name: 'Enterprise',
      description: 'For Large companies',
      price: 160,
      options: [
        '1000GB of Bandwidth',
        'Max 5000 connection',
        '8GB RAM',
        'Unlimited access',
        'Unlimited User',
        'Data analytics'
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

  togglePlan(event: any) {
  }


}
