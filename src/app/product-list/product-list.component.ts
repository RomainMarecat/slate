import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from './../shared/product/product.service';
import { Product } from './../shared/product/product';
import { IProduct } from './../shared/product/i-product';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../shared/user/user.service';
import { AlertService } from './../shared/alert/alert.service';
import { LoaderService } from './../shared/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products$: Observable < IProduct[] > ;
  products: Array < IProduct > ;
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  /**
   * constructor
   * @param {ProductService}   private productService
   * @param {Router}           private router
   * @param {Meta}             private meta
   * @param {ElementRef}       private ProductComponent
   * @param {UserService}      private userService
   * @param {AlertService}     public  alertService
   * @param {LoaderService}    private loaderService
   * @param {TranslateService} private translateService
   */
  constructor(private productService: ProductService, private router: Router,
    private meta: Meta, private ProductComponent: ElementRef,
    private userService: UserService, public alertService: AlertService,
    private loaderService: LoaderService, private translateService: TranslateService) {
    this.headerHeight = 0;
    this.pageLimit = 100;
    this.rowHeight = 300;
  }

  /**
   * Show loader and Add meta tags
   * Diplay All products index by published at
   */
  ngOnInit() {
    this.loaderService.show();
    this.translateService.get('meta.title.content')
      .subscribe((translation: string) => {
        this.meta.addTag({ name: 'title', content: translation });
      });
    this.translateService.get('meta.description.content')
      .subscribe((translation: string) => {
        this.meta.addTag({ name: 'description', content: translation });
      });

    this.meta.addTags([
      { property: 'fb:app_id', content: environment.facebook_app_id },
      { rel: 'canonical', href: 'https://monpullmoche.com' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://monpullmoche.com' },
      { rel: 'alternate', hreflang: 'en', href: 'https://myuglysweat.com' }
    ]);

    this.loadProducts(this.pageLimit);
  }

  /**
   * Update on root
   * @param {IProduct} product
   */
  updateProduct(product: IProduct) {
    this.productService.updateProduct(product);
  }

  /**
   * Go to form page Add root
   */
  addProduct() {
    this.router.navigate(['/add']);
  }

  /**
   * Load Products with current limit
   * @param {number} limit
   */
  loadProducts(limit: number) {
    this.productService.keyFilters$.next(null);
    this.productService.nameFilters$.next(null);
    this.productService.publishedFilter$.next(true);
    this.products$ = this.productService.getProducts();
    this.loaderService.hide();
  }
}
