import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../shared/product/product.service';
import { ClothingProduct } from '../../../shared/product/clothing-product';
import { Observable } from 'rxjs/Observable';
import { SelectionService } from '../../../shared/selection/selection.service';
import { Selection } from '../../../shared/selection/selection';
import { UserService } from '../../../shared/user/user.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { LoaderService } from './../../../shared/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment.hockey';
import { HockeyProduct } from '../../../shared/product/hockey-product';
import { MenuService } from './../../../shared/menu/menu.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products: Array < HockeyProduct > = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;
  isLoading: boolean;
  selection: Selection;

  /**
   * @param ProductService   private productService
   * @param SelectionService private selectionService
   * @param Router           private router
   * @param ActivatedRoute   private activatedRoute
   * @param Meta             private meta
   * @param ElementRef       private ProductComponent
   * @param UserService      private userService
   * @param MenuService      private menuService
   * @param AlertService     public  alertService
   * @param LoaderService    private loaderService
   * @param TranslateService private translateService
   */
  constructor(private productService: ProductService,
    private selectionService: SelectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

  /**
   * Show loader and Add meta tags
   * Diplay All products index by published at
   */
  ngOnInit() {
    this.menuService.nextTitle('');
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
      { rel: 'canonical', href: 'https://hockey-f2b77.firebaseapp.com' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://hockey-f2b77.firebaseapp.com' },
      { rel: 'alternate', hreflang: 'en', href: 'https://hockey-f2b77.firebaseapp.com' }
    ]);

    this.loadProducts();
  }

  /**
   * Load Products by selection
   */
  loadProducts() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        const key = value.key;
        this.selectionService.getSelection(key)
          .subscribe((selection: Selection) => {
            this.selection = selection;
            if (this.selection && this.selection.products) {
              this.getProducts();
            }
          });
      }
    });
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((products) => {
        this.products = products.filter((product: HockeyProduct) => {
          return this.selection.products.includes(product.key);
        });
        this.isLoading = false;
        this.loaderService.hide();
      });
  }
}
