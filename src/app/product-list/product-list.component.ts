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

  constructor(private productService: ProductService, private router: Router,
    private meta: Meta, private ProductComponent: ElementRef,
    private userService: UserService, public alertService: AlertService,
    private loaderService: LoaderService) {
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
    this.meta.addTags([
      { name: 'title', content: 'Mon pull Moche' },
      { name: 'description', content: 'Découvrez la liste officielle des pulls moches.' },
    ]);

    this.loadProducts(this.pageLimit);
  }

  /**
   * Update on product
   * @param {IProduct} product
   */
  updateProduct(product: IProduct) {
    this.productService.updateProduct(product);
  }

  /**
   * Go to form page Add product
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
