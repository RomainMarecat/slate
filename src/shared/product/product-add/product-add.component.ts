import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClothingProduct } from '../shared/clothing-product';
import { ProductService } from '../shared/product.service';
import { UserService } from '../../user/shared/user.service';
import { LoaderService } from '../../loader/loader.service';
import { AlertService } from '../../popup/alert.service';
import { NotificationService } from '../../slack/notification.service';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: ClothingProduct;
  ratio: string;
  user: any;

  constructor(private router: Router, private productService: ProductService,
              public alertService: AlertService, private userService: UserService,
              private loaderService: LoaderService, private slackNotification: NotificationService,
              private meta: Meta, private translateService: TranslateService) {
    this.user = this.userService.getUser();
    this.ratio = '3:5';
    this.loaderService.show();
  }

  /**
   * Show loader
   */
  ngOnInit() {
    this.loaderService.hide();
    // Title + description
    this.translateService.get('product-add.meta.title')
      .subscribe((translation: string) => {
        this.meta.addTag({name: 'title', content: translation});
      });
    this.translateService.get('product-add.meta.description')
      .subscribe((translation: string) => {
        this.meta.addTag({name: 'description', content: translation});
      });
  }

  /**
   * When the form is submitted, we create new product
   * And show a toast to display info
   */
  onProductSubmit(product: ClothingProduct) {
    this.productService.createProduct(product);
    try {
      this.slackNotification.notifySlack({
        text: `New product has been send. ${product.name} by ${this.user.displayName}`
      }).subscribe(
        (res) => res,
        (err: HttpErrorResponse) => {
          console.error(err);
        }
      );
    } catch (e) {
      console.error(e);
    }
    this.alertService.toast('snackbar.product-add.submit', 'info');
    this.router.navigate(['/']);
  }

  /**
   * Get the new product value
   */
  onProductChange(product: ClothingProduct) {
    this.product = {...this.product, ...product};
  }
}
