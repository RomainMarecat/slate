import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HockeyProduct } from '../../../shared/product/shared/hockey-product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { CloudinaryUploadService } from './../../../shared/media/cloudinary/cloudinary-upload.service';
import { StringService } from '../../../shared/util/string.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: HockeyProduct;
  image: string;
  editable: Observable<boolean> = of(false);

  constructor(private router: Router,
              private productService: ProductService,
              private cloudinaryUploadService: CloudinaryUploadService,
              private userService: UserService) {
  }

  ngOnInit() {
    if (this.product) {
      if (this.product.images[0] && this.product.images[0].indexOf('http') === -1) {
        this.image = this.product.images[0];
      }
    }
    this.editable = this.userService.isAdmin();
  }

  productDetail(event: any) {
    this.router.navigate([
      '/product/' +
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
