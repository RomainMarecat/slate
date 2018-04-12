import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.menincar';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../../shared/product/product.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { MenuService } from '../../../shared/menu/menu.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { Meta, Title } from '@angular/platform-browser';
import { UserService } from '../../../shared/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarProduct } from '../../../shared/product/car-product';
import { AreaService } from '../../../shared/map/shared/area.service';
import { Area } from '../../../shared/map/shared/area';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-menincar-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products: Array<CarProduct> = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;
  isLoading: boolean;
  area: Area;

  constructor(private productService: ProductService,
              private areaService: AreaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title,
              private meta: Meta,
              private ProductComponent: ElementRef,
              private userService: UserService,
              private menuService: MenuService,
              public alertService: AlertService,
              private loaderService: LoaderService,
              private translateService: TranslateService) {
    this.headerHeight = 0;
    this.pageLimit = 100;
    this.rowHeight = 300;
    this.isLoading = true;
  }

  ngOnInit() {
    this.menuService.nextTitle('');
    this.loaderService.show();
    this.translateService.get([ 'meta.title.product-list', 'meta.description.product-list' ])
      .subscribe((translations: string[]) => {
        this.meta.addTag({name: 'description', content: translations[ 'meta.description.product-list' ]});
        this.title.setTitle(translations[ 'meta.title.product-list' ]);
      });

    this.meta.addTags([
      {property: 'fb:app_id', content: environment.facebook_app_id},
      {rel: 'canonical', href: 'https://hockey-f2b77.firebaseapp.com'},
      {rel: 'alternate', hreflang: 'x-default', href: 'https://hockey-f2b77.firebaseapp.com'},
      {rel: 'alternate', hreflang: 'en', href: 'https://hockey-f2b77.firebaseapp.com'}
    ]);

    this.loadProducts();
  }

  /**
   * Load Products by area
   */
  loadProducts() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key.substring(0, value.key.indexOf('-'));
        this.areaService.getArea(key)
          .subscribe((area: Area) => {
            this.area = area;
            if (this.area) {
              this.getProducts();
            }
          });
      }
    });
  }

  getProducts() {
    console.log('get Products');
    this.productService.orderBy$.next({
      column: 'published_at',
      direction: 'desc'
    });
    this.productService.limit$.next(10);
    this.productService.getProducts()
      .take(1)
      .subscribe((products) => {
        // this.products = products.filter((product: CarProduct) => {
        //   // return product.area === this.area.key
        //   return 1;
        // });
        console.log(products);
        this.products = products;
        this.isLoading = false;
        this.loaderService.hide();
      });
  }
}
