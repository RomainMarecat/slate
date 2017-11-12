import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../shared/product/product.service';
import { IProduct } from './../shared/product/i-product';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;
  cols: number;
  @Output() updatedproduct:	 EventEmitter < IProduct > = new EventEmitter < IProduct > ();
  resizedImage = {
    height: 300,
    width: 500
  };

  constructor(private productService: ProductService, private activeRoute: ActivatedRoute) {
    this.cols = 0;
  }

  /**
   * Subscribe on value return by route nav and get unique identified by product key
   */
  ngOnInit() {
    this.activeRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        this.productService.getProduct(key)
          .subscribe((products: IProduct[]) => {
            products.forEach(product => this.product = product);
            this.countCols();
          });
      }
    });
  }

  /**
   * Dynamic count columns for product image
   */
  countCols() {
    if (this.product)	 {
      if (this.product.image1) {
        this.cols++;
      }
      if (this.product.image2) {
        this.cols++;
      }
      if (this.product.image3) {
        this.cols++;
      }
    }

  }

  /**
   * Update current score for the product
   * @param {IProduct} product
   */
  updateScoreProduct(product: IProduct) {
    this.updatedproduct.emit(product);
  }

}
