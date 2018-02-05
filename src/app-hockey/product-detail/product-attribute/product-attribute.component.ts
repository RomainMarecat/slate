import { Component, OnInit, Input } from '@angular/core';
import { HockeyProduct } from './../../../shared/product/hockey-product';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.scss']
})
export class ProductAttributeComponent implements OnInit {
  @Input('product') product: HockeyProduct;
  colors: string[];

  constructor() {
    this.colors = ['primary', 'warn', 'accent'];
  }

  ngOnInit() {}

}
