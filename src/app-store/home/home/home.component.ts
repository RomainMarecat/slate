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
    layout: 'card',
    product_new: {
      display_title: true,
      initial_products: [],
      products: [],
      title: 'product-new.header.title'
    },
    product_recent_month: {
      display_title: true,
      products: [],
      title: 'product-recent-month.header.title'
    },
    product_best: {
      display_title: true,
      products: [],
      title: 'product-best.header.title'
    },
    product_most_viewed: {
      display_title: true,
      products: [],
      title: 'product-most-viewed.header.title'
    },
    product_most_commented: {
      display_title: true,
      products: [],
      title: 'product-most-commented.header.title'
    },
    user: null,
    cart: null
  };

  @Output() productCount: EventEmitter<number> = new EventEmitter<number>();

  private _productStartIndex = 0;
  @Input() set productStartIndex(val: number) {
    this._productStartIndex = val;
    this.productOptions.product_new.products =
      this.productOptions.product_new.initial_products.slice(this._productStartIndex, this._productEndIndex);
  }

  private _productEndIndex = 4;
  @Input() set productEndIndex(val: number) {
    this._productEndIndex = val;
    this.productOptions.product_new.products =
      this.productOptions.product_new.initial_products.slice(this._productStartIndex, this._productEndIndex);
  }

  /**
   * private, setter et getter pour le mode de layout (cards ou liste)
   */
  private _layout = true;
  @Input() set layout(layout: boolean) {
    this._layout = layout;
    this.productOptions.layout = layout ? 'card' : 'list';
  }

  get layout() {
    return this._layout;
  }

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
        value: 10
      }
    ]);
    this.productService.limit$.next(3);
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
        value: 10
      }
    ]);
    this.productService.limit$.next(10);
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
    this.productService.limit$.next(3);
    return new Observable((observer) => {
      const subscription: Subscription = this.productService.getProducts()
        .subscribe((products: Product[]) => {
          if (subscription) {
            subscription.unsubscribe();
          }
          this.productOptions.product_new.initial_products = products;
          this.productCount.emit(this.productOptions.product_new.initial_products.length);
          this.productOptions.product_new.products =
            this.productOptions.product_new.initial_products.slice(this._productStartIndex, this._productEndIndex);
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
          this.productOptions.product_new.initial_products = [];
          this.productCount.emit(this.productOptions.product_new.initial_products.length);
          this.productOptions.product_new.products =
            this.productOptions.product_new.initial_products.slice(this._productStartIndex, this._productEndIndex);
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
        value: moment().subtract(1, 'months').toDate()
      }
    ]);
    this.productService.limit$.next(6);
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
        value: 4
      }
    ]);
    this.productService.limit$.next(3);
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
