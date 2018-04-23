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
import { OfferService } from '../../../shared/offer/offer.service';
import { Category } from '../../../shared/category/category';
import { CarOffer } from '../../../shared/offer/offer';
import { CategoryService } from '../../../shared/category/category.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-menincar-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.scss' ]
})
export class ProductListComponent implements OnInit {
  // Products collection of Product interface
  products: Array<CarProduct> = [];
  offers: Array<CarOffer> = [];
  rowHeight: number;
  headerHeight: number;
  pageLimit: number;
  isLoading: boolean;
  area: Area;
  category: Category;

  constructor(private productService: ProductService,
              private areaService: AreaService,
              private offerService: OfferService,
              private categoryService: CategoryService,
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
      {rel: 'canonical', href: 'https://menincar-384269.firebaseapp.com'},
      {rel: 'alternate', hreflang: 'x-default', href: 'https://menincar-384269.firebaseapp.com'},
      {rel: 'alternate', hreflang: 'en', href: 'https://menincar-384269.firebaseapp.com'}
    ]);

    this.loadOffers();
  }

  /**
   * Load Products by area
   */
  loadOffers() {
    this.activatedRoute.params.subscribe((value: { area: string, category: string }) => {
      if (value.area) {
        const key = value.area.substring(0, value.area.indexOf('-'));
        this.areaService.getArea(key)
          .take(1)
          .subscribe((area: Area) => {
            this.area = area;
            if (area) {
              this.getOffersByRegion(area);
            }
          });
      }
      if (value.category) {
        const key = value.category.substring(0, value.category.indexOf('-'));
        this.categoryService.getCategory(key)
          .take(1)
          .subscribe((category: Category) => {
            this.category = category;
            if (category) {
              this.getOffersByModel(category);
            }
          });
      }
    });
  }

  getOffersByModel(model: Category) {
    this.offerService.filters$.next([
      {
        column: 'model',
        operator: '==',
        value: model.key
      }
    ]);
    this.offerService.getOffers()
      .finally(() => {
        this.isLoading = false;
        this.loaderService.hide();
      })
      .subscribe((offers: CarOffer[]) => {
        this.offers = offers;
      });
  }

  getOffersByRegion(area: Area) {
    if (area.place_id) {
      this.offerService.filters$.next([ {
        column: 'location.region.place_id',
        operator: '==',
        value: area.place_id
      } ]);
      // Problem with filters on subscribe
      // this.offerService.orderBy$.next({
      //   column: 'published_at',
      //   direction: 'desc'
      // });
      this.offerService.limit$.next(10);
      this.offerService.getOffers()
        .take(1)
        .finally(() => {
          this.isLoading = false;
          this.loaderService.hide();
        })
        .subscribe((offers: CarOffer[]) => {
          this.offers = offers;
        }, (err) => {
          console.error(err);
        });
    } else {
      this.isLoading = false;
      this.loaderService.hide();
    }
  }
}
