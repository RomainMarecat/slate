import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/product.service';
import { HockeyProduct } from '../../../shared/product/hockey-product';

@Component({
  selector: 'app-hockey-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: HockeyProduct;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) {}

  ngOnInit() {
    this.getProduct();

  }

  getProduct() {
    console.log('getProduct');
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      console.log(value.key);
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        console.log(key);
        if (key) {
          this.productService.getProduct(key)
            .subscribe((product: HockeyProduct) => {
              console.log(product);
              this.product = product;
            });
        }
      }
    });
  }

}
