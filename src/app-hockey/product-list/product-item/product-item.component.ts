import { Component, Input, OnInit } from '@angular/core';
import { HockeyProduct } from '../../../core/shared/product/hockey-product';
import { ProductService } from '../../../core/shared/product/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: HockeyProduct;
  image: string;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.product) {
      this.product.images.map((image: string) => {
        this.image = image;
      });
    }
  }

  productDetail() {}

}
