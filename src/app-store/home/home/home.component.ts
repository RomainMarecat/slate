import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slider } from '../header/header/shared/slider';
import { Product } from '../../../shared/product/shared/product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { CartService } from '../../../shared/cart/shared/cart.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { ProductOption } from '../../../shared/product/shared/product-option';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryOptions: {
    display_title: boolean;
    display_subtitle: boolean;
    image_link: boolean;
    text_link: boolean;
    display_icon: boolean;
    display_image: boolean;
  } = {
    display_title: true,
    display_subtitle: true,
    image_link: true,
    text_link: true,
    display_icon: true,
    display_image: true,
  };

  sliderOptions: {sliders: Slider[]} = {
    sliders: [
      {
        title: 'magazines',
        image: '/assets/images/bg-1.jpg',

      }, {
        title: 'shopping',
        image: '/assets/images/bg-2.jpg'
      }
    ]
  };

  productOptions: ProductOption = {
    authenticated: false,
    cart: null,
    product_new: {
      layout: 'card',
      limit: 3,
      display_title: true,
      initial_products: [],
      products: [],
      title: 'product-new.header.title'
    },
    product_recent_month: {
      layout: 'list',
      limit: 6,
      display_title: true,
      threshold: moment().subtract(1, 'months'),
      products: [],
      title: 'product-recent-month.header.title'
    },
    product_best: {
      layout: 'card',
      limit: 3,
      display_title: true,
      products: [],
      threshold: 4,
      title: 'product-best.header.title'
    },
    product_most_viewed: {
      layout: 'card',
      limit: 10,
      display_title: true,
      products: [],
      threshold: 10,
      title: 'product-most-viewed.header.title'
    },
    product_most_commented: {
      layout: 'card',
      limit: 3,
      display_title: true,
      products: [],
      threshold: 10,
      title: 'product-most-commented.header.title'
    },
    user: null,
  };

  constructor(private productService: ProductService,
              private alertService: AlertService,
              private userService: UserService,
              private cartService: CartService,
              private seoService: SeoService) {
    this.seoService.setSeo('home');
  }

  ngOnInit() {
    this.isAuhenticated();
    this.getNewProducts().subscribe(() => {
      this.getRecentPublishedProducts().subscribe(() => {
        this.getBestProducts().subscribe(() => {
          this.getProductsMostViewed().subscribe(() => {
            this.getProductsMostCommented().subscribe(() => {
            });
          });
        });
      });
    }, () => {
    });
    this.getCart();
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
        value: this.productOptions.product_most_commented.threshold
      }
    ]);
    this.productService.limit$.next(this.productOptions.product_most_commented.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_commented.products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
        value: this.productOptions.product_most_viewed.threshold
      }
    ]);
    this.productService.limit$.next(this.productOptions.product_most_viewed.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_most_viewed.products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
    this.productService.limit$.next(this.productOptions.product_new.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_new.products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
        value: this.productOptions.product_recent_month.threshold.toDate()
      }
    ]);
    this.productService.limit$.next(this.productOptions.product_recent_month.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_recent_month.products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
        value: this.productOptions.product_best.threshold
      }
    ]);
    this.productService.limit$.next(this.productOptions.product_best.limit);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_best.products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
