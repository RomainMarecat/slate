import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from './../../shared/product/i-product';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: IProduct;
  @Input() user: any;
  // Current image size to display
  resizedImage = { height: '240', width: '240' };

  constructor() {}

  ngOnInit() {}
}
