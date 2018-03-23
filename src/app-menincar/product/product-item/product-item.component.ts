import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarProduct } from '../../../shared/product/car-product';

@Component({
  selector: 'app-menincar-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: CarProduct;

  constructor() { }

  ngOnInit() {
  }

}
