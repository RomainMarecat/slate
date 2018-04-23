import { Component, Input, OnInit } from '@angular/core';
import { CarProduct } from '../../../shared/product/car-product';
import { Router } from '@angular/router';
import { StringService } from '../../../shared/util/string.service';

@Component({
  selector: 'app-menincar-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: CarProduct;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  productDetail(event: any) {
    this.router.navigate([
      '/product/' +
      this.product.key + '-' + StringService.slugify(this.product.name)
    ]);
  }
}
