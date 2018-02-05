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

  resizedImage = {
    height: 300,
  };

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        if (key) {
          this.productService.getProduct(key)
            .subscribe((product: HockeyProduct) => {
              product.attributes = product.attributes.map((attribute: any) => {
                attribute.label = attribute.label.trim().replace(/ /g, '');
                return attribute;
              });
              this.product = product;
            });
        }
      }
    });
  }

  updateScoreProduct(event: any) {

  }

}
