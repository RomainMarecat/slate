import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Slider } from '../header/header/shared/slider';
import { Product } from '../../../shared/product/shared/product';
import { ProductService } from '../../../shared/product/shared/product.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { CartService } from '../../../shared/cart/shared/cart.service';
import { Cart } from '../../../shared/cart/shared/cart';
import { SeoService } from '../../../shared/seo/shared/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  authenticated: boolean;

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

  productOptions: {
    layout: string;
    products: Product[],
    display_products: Product[],
    cart: Cart
  } = {
    layout: 'card',
    products: [],
    display_products: [],
    cart: null
  };

  @Output() productCount: EventEmitter<number> = new EventEmitter<number>();

  private _productStartIndex = 0;
  @Input() set productStartIndex(val: number) {
    this._productStartIndex = val;
    this.productOptions.display_products = this.productOptions.products.slice(this._productStartIndex, this._productEndIndex);
  }

  private _productEndIndex = 4;
  @Input() set productEndIndex(val: number) {
    this._productEndIndex = val;
    this.productOptions.display_products = this.productOptions.products.slice(this._productStartIndex, this._productEndIndex);
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
    this.authenticated = false;
    this.seoService.setSeo('home');
  }

  ngOnInit() {
    this.isAuhenticated();
    this.getProducts();
    this.getCart();
  }


  /**
   * gets the products from the API
   */
  getProducts() {
    this.productService.filters$.next([
      {
        column: 'published',
        operator: '==',
        value: true
      }
    ]);
    this.productService.limit$.next(3);
    this.productService.getProducts()
      .subscribe((products: Product[]) => {
        this.productOptions.products = products;
        this.checkProductsInCart();
        this.getFavoriteProducts();
        this.productCount.emit(this.productOptions.products.length);
        this.productOptions.display_products = this.productOptions.products.slice(this._productStartIndex, this._productEndIndex);
      }, () => {
        this.alertService.show('error.api.general');
        this.productOptions.products = [];
        this.productCount.emit(this.productOptions.products.length);
        this.productOptions.display_products = this.productOptions.products.slice(this._productStartIndex, this._productEndIndex);
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
        this.authenticated = authenticated;
      }, () => {
        this.authenticated = false;
      });
  }

  checkProductsInCart() {

  }

  getFavoriteProducts() {
  }
}
