import { Component, OnInit } from '@angular/core';
import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';
import { CartService } from '../shared/cart.service';
import { AlertService } from '../../popup/alert.service';
import { Cart } from '../shared/cart';
import { Payment } from '../../payment/shared/payment';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';

@Component({
  selector: 'app-cart-wrapper',
  templateUrl: './cart-wrapper.component.html',
  styleUrls: ['./cart-wrapper.component.scss']
})
export class CartWrapperComponent implements OnInit {
  steps: {
    cart: boolean;
    connection: boolean;
    payment: boolean;
    confirmation: boolean;
  } = {
    cart: true,
    connection: false,
    payment: false,
    confirmation: false,
  };

  isUserCompleted = false;
  isUserAlreadyLogged = false;
  user: User;
  cart: Cart;
  displayXs: boolean;
  cartsSubscription: Subscription;

  constructor(private router: Router,
              private localizeRouterService: LocalizeRouterService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private cartService: CartService,
              private alertService: AlertService,
              private mediaObserver: MediaObserver) {
  }

  ngOnInit() {
    this.getUser();
    this.mediaObserver.asObservable().subscribe((changes: MediaChange[]) => {
      if (changes.length > 0) {
        this.displayXs = changes[0].mqAlias === 'xs';
      }
    });
  }

  getCart() {
    this.cartService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: this.user.uid
      },
      {
        column: 'status',
        operator: '==',
        value: 'current'
      }
    ]);
    this.cartsSubscription = this.cartService.getCarts()
      .subscribe((carts) => {
        this.cart = carts.sort((previous, next) => {
          if (previous.updated_at < next.updated_at) {
            return 1;
          }
          return -1;
        })[0];
        if (!this.cart) {
          this.createCart();
          return;
        }

        if (!this.cart.state) {
          this.cart.state = 'cart';
        }

        if (this.cart &&
          this.cart.order &&
          this.cart.state === 'confirmation') {
          this.router.navigate([
            this.localizeRouterService.translateRoute('cart'),
            'order',
            this.cart.order
          ]);
        }
        this.cartService.cart$.next(this.cart);
      }, (err: HttpErrorResponse) => {
        if (err && err.error && err.error.message) {
          this.alertService.show(err.error.message);
        }
      });
  }

  getUser() {
    this.userService.getAuthState()
      .subscribe((user) => {
        if (user) {
          this.isUserAlreadyLogged = true;
          this.isUserCompleted = true;
          this.user = user;
          this.getCart();
          return;
        }
        this.isUserAlreadyLogged = false;
      }, () => {
        this.isUserAlreadyLogged = false;
      });
  }

  createCart() {
    const cart: Cart = {
      user: this.user.uid,
      items: [],
      total: 0,
      status: 'current',
      state: 'cart',
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.cartService.createCart(cart)
      .subscribe(doc => {
        cart.key = doc.id;
        this.updateCart(cart);
      }, () => {
        if (this.cartsSubscription) {
          this.cartsSubscription.unsubscribe();
        }
        this.alertService.message('cart.creation.error');
      });
  }

  updateCart(cart: Cart) {
    this.cartService.updateCart(cart)
      .subscribe(() => {
        },
        (err: HttpErrorResponse) => {
          this.alertService.show('cart-add.error.update-cart-error');
        });
  }

  /**
   * After validate cart items
   */
  onSaveCart(cart: Cart) {
    this.cart = cart;
    this.cartService.cart$.next(cart);

    // Content loading issue
    setTimeout(() => {
      this.cart.state = 'connection';
      if (this.user) {
        this.cart.state = 'delivery';
      }
      this.cartService.updateCart(this.cart)
        .subscribe(() => {
          this.router.navigate(
            [this.localizeRouterService.translateRoute('/cart'), this.cart.state]
          );
        }, () => {
        });
    }, 200);
  }

  /**
   * After sso login
   */
  onLogin() {
    this.userService.getLoginGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(user));
          this.isUserCompleted = true;
          this.cart.user = this.user.uid;
          this.cartService.updateCart(this.cart)
            .subscribe(() => {
              setTimeout(() => {
                this.router.navigate(
                  [this.localizeRouterService.translateRoute('/cart'), 'delivery']
                );
              }, 200);
            }, (err: HttpErrorResponse) => {
              this.alertService.show(err.error.message);
            });
        }
      }, (err: HttpErrorResponse) => {
        if (err && err.error && err.error.message) {
          this.alertService.show(err.error.message);
        }
      });
  }

  /**
   * On cancel payment view or cart view or delivery view
   */
  onCancel(event: boolean, route: 'cart' | 'connection' | 'payment' | 'confirmation') {
    if (event === true) {
      this.cart.state = route;
      this.cartService.cart$.next(this.cart);
      this.cartService.updateCart(this.cart)
        .subscribe(() => {
          if (route === 'cart') {
            this.router.navigate(
              [this.localizeRouterService.translateRoute(`/${this.cart.state}`)]
            );
            return;
          }

          this.router.navigate(
            [this.localizeRouterService.translateRoute('/cart'), this.cart.state]
          );
        });
    }
  }

  /**
   * On delivery change and click cta validate delivery
   */
  onAcceptDelivery(cart: Cart) {
    this.cart.state = 'payment';
    this.cartService.cart$.next(this.cart);
    this.cartService.updateCart(this.cart)
      .subscribe(() => {
        this.router.navigate(
          [this.localizeRouterService.translateRoute('/cart'), cart.state]
        );
      });
  }

  /**
   * On fill and validate payment
   */
  onPaid(payment: Payment) {
    if (this.cartsSubscription) {
      this.cartsSubscription.unsubscribe();
    }

    this.router.navigate(
      [this.localizeRouterService.translateRoute('cart'),
        'order',
        payment.order
      ]
    );
  }
}
