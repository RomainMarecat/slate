import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../../shared/product/product.service';
import { ClothingProduct } from '../../shared/product/clothing-product';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/user/user.service';
import { AlertService } from '../../shared/popup/alert.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../../shared/facet/filter/shared/filter';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products$: Observable<ClothingProduct[]>;
  products: Array<ClothingProduct>;
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;

  /**
   * constructor
   * @param productService
   * @param router
   * @param meta
   * @param ProductComponent
   * @param userService
   * @param alertService
   * @param loaderService
   * @param translateService
   */
  constructor(private productService: ProductService,
              private router: Router,
              private meta: Meta,
              private ProductComponent: ElementRef,
              private userService: UserService,
              public alertService: AlertService,
              private loaderService: LoaderService,
              private translateService: TranslateService) {
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
        this.meta.addTag({name: 'title', content: translation});
      });
    this.translateService.get('meta.description.content')
      .subscribe((translation: string) => {
        this.meta.addTag({name: 'description', content: translation});
      });

    this.meta.addTags([
      {property: 'fb:app_id', content: environment.facebook_app_id},
      {rel: 'canonical', href: 'https://clothe.com'},
      {rel: 'alternate', hreflang: 'x-default', href: 'https://clothe.com'},
      {rel: 'alternate', hreflang: 'en', href: 'https://myuglysweat.com'}
    ]);

    this.loadProducts();
  }

  /**
   * Update on product
   * @param {ClothingProduct} product
   */
  updateProduct(product: ClothingProduct) {
    this.productService.updateProduct(product);
  }

  /**
   * Go to form page Add product
   */
  addProduct() {
    this.router.navigate([ '/add' ]);
  }

  /**
   * Load Products with current limit
   */
  loadProducts() {
    this.productService.filters$.next(null);
    const filters: Filter[] = [ {
      column: 'published',
      operator: '==',
      value: true
    } ];
    this.productService.filters$.next(filters);
    this.products$ = this.productService.getProducts();
    this.loaderService.hide();
  }
}
