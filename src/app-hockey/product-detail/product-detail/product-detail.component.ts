import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/product.service';
import { DeviceService } from '../../../shared/device/device.service';
import { HockeyProduct } from '../../../shared/product/hockey-product';

@Component({
  selector: 'app-hockey-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: HockeyProduct;

  resizedImage: {
    height: number,
  };

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private deviceService: DeviceService) {
    this.resizedImage = { height: 400 };
  }

  ngOnInit() {
    this.getProduct();
    this.resizedImage.height = this.deviceService.isSmallAndDown() ? 300 : 400;
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
