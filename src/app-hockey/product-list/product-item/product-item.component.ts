import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from '../../../core/shared/product/i-product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: IProduct;

  constructor() { }

  ngOnInit() {
  }

}
