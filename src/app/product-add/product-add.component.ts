import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from './../shared/product/i-product';
import { ProductService } from './../shared/product/product.service';
import { UserService } from './../shared/user/user.service';
import { LoaderService } from './../shared/loader/loader.service';
import { AlertService } from './../shared/alert/alert.service';
import { NotificationService } from './../shared/slack/notification.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  product: IProduct;
  ratio: string;
  user: any;

  /**
   *
   * @param {Router} router
   * @param {ProductService} ProductService
   * @param {AlertService} alertService
   * @param {UserService} userService
   * @param {LoaderService} loaderService
   */
  constructor(private router: Router, private productService: ProductService,
    public alertService: AlertService, private userService: UserService,
    private loaderService: LoaderService, private slackNotification: NotificationService) {
    this.user = this.userService.getUser();
    this.ratio = '3:5';
    this.loaderService.show();
  }

  /**
   * Show loader
   */
  ngOnInit() {
    this.loaderService.hide();
  }

  /**
   * When the form is submitted, we create new product
   * And show a toast to display info
   * @param {IProduct} product
   */
  onProductSubmit(product: IProduct) {
    this.productService.createProduct(product);
    this.slackNotification.notifySlack({
      text: `New product has been send. ${product.name} by ${this.user.displayName}`
    }).subscribe(res => console.log(res));
    this.alertService.toast('snackbar.product-add.submit', 'info');
    this.router.navigate(['/']);
  }

  /**
   * Get the new product value
   * @param {IProduct} product
   */
  onProductChange(product: IProduct) {
    this.product = product;
  }
}
