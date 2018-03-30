import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../shared/popup/alert.service';
import { Comment } from '../../../shared/comment/comment';
import { ProductService } from '../../../shared/product/product.service';
import { DeviceService } from '../../../shared/device/device.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../shared/user/user.service';
import { CommentService } from '../../../shared/comment/comment.service';
import { CarProduct } from '../../../shared/product/car-product';

@Component({
  selector: 'app-menincar-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: CarProduct;

  // User comments
  comments: Comment[] = [];

  resizedImage: {
    height: number,
  };

  /**
   *
   * @param {Meta} meta
   * @param {Title} title
   * @param {ActivatedRoute} activatedRoute
   * @param {ProductService} productService
   * @param {DeviceService} deviceService
   * @param {CommentService} commentService
   * @param {UserService} userService
   * @param {AlertService} alertService
   */
  constructor(private meta: Meta,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private deviceService: DeviceService,
              private commentService: CommentService,
              private userService: UserService,
              private alertService: AlertService) {
    this.resizedImage = {height: 400};
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
            .subscribe((product: CarProduct) => {
              this.meta.addTag({name: 'description', content: product.description});
              this.title.setTitle(product.name);
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


}
