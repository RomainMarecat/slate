import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private seoService: SeoService) {
    this.seoService.setSeo('cart');
  }

  ngOnInit() {
  }
}
