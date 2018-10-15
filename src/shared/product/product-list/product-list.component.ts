import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../user/shared/user.service';
import { AlertService } from '../../popup/alert.service';
import { LoaderService } from '../../loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from '../../facet/filter/shared/filter';
import { environment } from '../../../app-ecommerce/environments/environment';
import { Product } from '../shared/product';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products$: Observable<Product[]> = of();
  products: Array<Product> = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;
  loading: boolean;
  @Input() addProductPublicActivated = false;
  showScore: boolean;
  showAdd: boolean;

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
    this.loading = true;
    this.showScore = false;
    this.showAdd = false;
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
      {rel: 'canonical', href: ''},
      {rel: 'alternate', hreflang: 'x-default', href: ''},
      {rel: 'alternate', hreflang: 'en', href: ''}
    ]);

    this.loadProducts();
  }

  /**
   * Update on product
   * @param {Product} product
   */
  updateProduct(product: Product) {
    this.productService.updateProduct(product);
  }

  /**
   * Load Products with current limit
   */
  loadProducts() {
    this.productService.filters$.next(null);
    const filters: Filter[] = [{
      column: 'published',
      operator: '==',
      value: true
    }];
    this.productService.filters$.next(filters);
    this.products$ = this.productService.getProducts();

    this.products$.subscribe((products) => {
      this.products = products;
      this.loaderService.hide();
      this.loading = false;
    }, (err) => {
      this.alertService.show(err);
      this.loading = false;
    });
  }
}
