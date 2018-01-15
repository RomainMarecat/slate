import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HockeyProduct } from '../../../shared/product/hockey-product';
import { ProductService } from '../../../shared/product/product.service';
import { CloudinaryUploadService } from './../../../shared/cloudinary/cloudinary-upload.service';
import { StringService } from '../../../shared/util/string.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: HockeyProduct;
  image: string;

  constructor(private router: Router,
    private productService: ProductService,
    private cloudinaryUploadService: CloudinaryUploadService) {}

  ngOnInit() {
    if (this.product) {
      this.product.images.map((image: string) => {
        if (image.indexOf('http') === -1) {
          this.image = image;
        }
      });
    }
  }

  productDetail(event: any) {
    this.router.navigate([
      '/product/',
      this.product.key + '-' + StringService.slugify(this.product.name)
    ]);
  }

  updateScoreProduct(product: HockeyProduct) {
    this.updateProduct(product);
  }

  updateProduct(product: HockeyProduct) {
    this.productService.updateProduct(product);
  }
}
