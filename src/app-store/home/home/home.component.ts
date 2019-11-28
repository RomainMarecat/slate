import { Component, OnInit } from '@angular/core';
import { Slider } from '../header/header/shared/slider';
import { Product } from '../../../shared/product/shared/product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { CartService } from '../../../shared/cart/shared/cart.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { Observable, Subscription } from 'rxjs';
import { ProductOption } from '../../../shared/product/shared/product-option';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FirebaseError } from 'firebase';
import { CategoryOption } from './shared/category-option';
import { HomeConfigService } from './shared/home-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryOptions: CategoryOption;

  sliderOptions: {sliders: Slider[]};

  productOptions: ProductOption;

  constructor(private productService: ProductService,
              private alertService: AlertService,
              private userService: UserService,
              private cartService: CartService,
              private seoService: SeoService,
              private homeConfigService: HomeConfigService) {
    this.seoService.setSeo('home');
    this.categoryOptions = this.homeConfigService.getCategoryOptions();
    this.sliderOptions = this.homeConfigService.getSliderOption();
    this.productOptions = this.homeConfigService.getProductOption();
  }

  ngOnInit() {
    this.isAuhenticated();
    this.getProductsMostOrderedThisMonth().subscribe(() => {
      this.getNewProducts().subscribe(() => {
        this.getRecentPublishedProducts().subscribe(() => {
          this.getBestProducts().subscribe(() => {
            this.getProductsMostViewed().subscribe(() => {
              this.getProductsMostCommented().subscribe(() => {
                this.getProductsMostOrdered().subscribe(() => {

                });
              });
            });
          });
        });
      });
    });

    this.getCart();
  }

  getProductsMostOrderedThisMonth(): Observable<void> {
    const now: string = moment().format('YYYY-MM');
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: `ordered_by_month.${now}`,
        operator: '>',
        value: 0
      },
    ]);
    this.productService.orderBy$.next(this.productOptions.product_most_ordered_this_month.order_by);
    this.productService.limit$.next(this.productOptions.product_most_ordered_this_month.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_ordered_this_month.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_most_ordered_this_month.products = [];
          observer.error(err);
        });
    });
  }

  getProductsMostOrdered(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'ordered',
        operator: '>',
        value: 0
      },
    ]);
    this.productService.orderBy$.next(this.productOptions.product_most_ordered.order_by);
    this.productService.limit$.next(this.productOptions.product_most_ordered.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_ordered.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_most_ordered.products = [];
          observer.error(err);
        });
    });
  }

  getProductsMostCommented(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'commented',
        operator: '>',
        value: this.productOptions.product_most_commented.threshold as number
      }
    ]);
    this.productService.orderBy$.next({column: 'commented', direction: 'desc'});
    this.productService.limit$.next(this.productOptions.product_most_commented.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_commented.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_most_commented.products = [];
          observer.error(err);
        });
    });
  }

  getProductsMostViewed(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'viewed',
        operator: '>',
        value: this.productOptions.product_most_viewed.threshold as number
      }
    ]);
    this.productService.orderBy$.next({column: 'viewed', direction: 'desc'});
    this.productService.limit$.next(this.productOptions.product_most_viewed.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_viewed.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_most_viewed.products = [];
          observer.error(err);
        });
    });
  }

  getNewProducts(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'is_new',
        operator: '==',
        value: true
      }
    ]);
    this.productService.orderBy$.next({column: 'published_at', direction: 'desc'});
    this.productService.limit$.next(this.productOptions.product_new.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_new.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_new.products = [];
          observer.error(err);
        });
    });
  }

  getRecentPublishedProducts(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'published_at',
        operator: '>',
        value: (this.productOptions.product_recent_month.threshold as Moment).toDate()
      }
    ]);
    this.productService.orderBy$.next({column: 'published_at', direction: 'desc'});
    this.productService.limit$.next(this.productOptions.product_recent_month.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_recent_month.products = products;
          observer.next();
          observer.complete();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_recent_month.products = [];
          observer.error(err);
        });
    });
  }

  getBestProducts(): Observable<void> {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      },
      {
        column: 'score',
        operator: '>=',
        value: this.productOptions.product_best.threshold as number
      }
    ]);
    this.productService.orderBy$.next({column: 'score', direction: 'desc'});
    this.productService.limit$.next(this.productOptions.product_best.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_best.products = products;
          observer.next();
        }, (err: FirebaseError) => {
          this.alertService.openAlertMessage(
            {title: 'error.api.general', message: err.message},
            {panelClass: 'alert-danger'}
          );
          this.productOptions.product_best.products = [];
          observer.error(err);
        });
    });
  }

  getCart() {
    this.userService.getAuthState()
      .subscribe((user) => {
        if (user) {
          this.cartService.filters$.next([
            {
              operator: '==',
              column: 'user',
              value: user.uid
            },
            {
              operator: '==',
              column: 'status',
              value: 'current'
            }
          ]);
          this.cartService.getCarts()
            .subscribe((carts) => {
              this.productOptions.cart = carts[0];
              this.cartService.cart$.next(carts[0]);
            });
        }
      });
  }

  isAuhenticated() {
    this.userService.isAuthenticated()
      .subscribe((authenticated) => {
        this.productOptions.authenticated = authenticated;
      }, () => {
        this.productOptions.authenticated = false;
      });
  }
}
