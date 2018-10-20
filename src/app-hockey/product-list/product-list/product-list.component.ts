import { Component, OnInit, ElementRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/product/shared/product.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { Selection } from '../../../shared/selection/selection';
import { UserService } from '../../../shared/user/shared/user.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { HockeyProduct } from '../../../shared/product/shared/hockey-product';
import { MenuService } from '../../../shared/menu/menu.service';
import { environment } from '../../environments/environment';

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

  constructor(private productService: ProductService,
    private selectionService: SelectionService,
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

  /**
   * Show loader and Add meta tags
   * Diplay All products index by published at
   */
  ngOnInit() {
    this.menuService.nextTitle('');
    this.loaderService.show();
    this.translateService.get(['meta.title.offer-list', 'meta.description.offer-list'])
      .subscribe((translations: string[]) => {
        this.meta.addTag({ name: 'description', content: translations['meta.description.offer-list'] });
        this.title.setTitle(translations['meta.title.offer-list']);
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
