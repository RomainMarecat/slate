import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SlackNotificationService } from '@romainmarecat/ngx-slack-notification';
import { LoaderService } from '../../loader/loader.service';
import { AlertService } from '../../popup/alert.service';
import { UserService } from '../../user/shared/user.service';
import { ClothingProduct } from '../shared/clothing-product';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

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
              private loaderService: LoaderService, private slackNotification: SlackNotificationService,
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
  onProductSubmit(product: Product) {
    this.productService.createProduct(product).subscribe();
    this.slackNotification.notify({
      text: `New product has been send. ${product.name} by ${this.user.displayName}`
    });
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
