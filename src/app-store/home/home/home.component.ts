import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slider } from '../header/header/shared/slider';
import { Product } from '../../../shared/product/shared/product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { CartService } from '../../../shared/cart/shared/cart.service';
import { Cart } from '../../../shared/cart/shared/cart';
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
    new_products: [],
    new_products_displayed: [],
    recent_month_products: [],
    user: null,
    cart: null
  };

  @Output() productCount: EventEmitter<number> = new EventEmitter<number>();

  private _productStartIndex = 0;
  @Input() set productStartIndex(val: number) {
    this._productStartIndex = val;
    this.productOptions.new_products_displayed = this.productOptions.new_products.slice(this._productStartIndex, this._productEndIndex);
  }

  private _productEndIndex = 4;
  @Input() set productEndIndex(val: number) {
    this._productEndIndex = val;
    this.productOptions.new_products_displayed = this.productOptions.new_products.slice(this._productStartIndex, this._productEndIndex);
  }

  /**
   * private, setter et getter pour le mode de layout (cards ou liste)
   */
  private _layout = true;
  @Input() set layout(layout: boolean) {
    this._layout = layout;
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
      this.getRecentPublishedProducts().subscribe();
    });
    this.getCart();
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
          this.productOptions.new_products = products;
          this.productCount.emit(this.productOptions.new_products.length);
          this.productOptions.new_products_displayed =
            this.productOptions.new_products.slice(this._productStartIndex, this._productEndIndex);
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
          this.productOptions.new_products = [];
          this.productCount.emit(this.productOptions.new_products.length);
          this.productOptions.new_products_displayed =
            this.productOptions.new_products.slice(this._productStartIndex, this._productEndIndex);
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
          this.productOptions.recent_month_products = products;
          observer.next();
        }, (err) => {
          this.alertService.show('error.api.general');
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
