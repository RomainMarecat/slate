import { Component, Input, OnInit } from '@angular/core';
import { ClothingProduct } from '../../../core/shared/product/clothing-product';
import { ProductService } from '../../../core/shared/product/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: ClothingProduct;

  constructor(private productService: ProductService) {}

  ngOnInit() {}

}
