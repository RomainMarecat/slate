import { Component, Input, OnInit } from '@angular/core';
import { HockeyProduct } from '../../../shared/product/hockey-product';
import { ProductService } from '../../../shared/product/product.service';
import { CloudinaryUploadService } from './../../../shared/cloudinary/cloudinary-upload.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input('product') product: HockeyProduct;
  image: string;

  constructor(private productService: ProductService,
    private cloudinaryUploadService: CloudinaryUploadService) {}

  ngOnInit() {
    if (this.product) {

      this.product.images.map((image: string) => {
        console.log('image', image);
        // Care care Loop can be insecure and DDOS upload media
        if (image.indexOf('http') === -1) {
          this.image = image;
        }
      });
    }
  }

  productDetail() {}

}
