import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { CartEditComponent } from '../cart-edit/cart-edit.component';
import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';
import { CartService } from '../shared/cart.service';
import { CartPaymentComponent } from '../cart-payment/cart-payment.component';
import { CartConfirmationComponent } from '../cart-confirmation/cart-confirmation.component';
import { AlertService } from '../../popup/alert.service';
import { Cart } from '../shared/cart';
import { Payment } from '../../payment/shared/payment';
import { HttpErrorResponse } from '@angular/common/http';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-start',
  templateUrl: './cart-start.component.html',
  styleUrls: ['./cart-start.component.scss']
})
export class CartStartComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(CartEditComponent) cartEditComponent: CartEditComponent;
  @ViewChild(CartPaymentComponent) cartPaymentComponent: CartPaymentComponent;
  @ViewChild(CartConfirmationComponent) cartConfirmationComponent: CartConfirmationComponent;
  isCartCompleted = false;
  isUserCompleted = false;
  isPaymentCompleted = false;
  isPaymentConfirmed = false;
  isUserAlreadyLogged = false;
  user: User;
  cart: Cart;
  displayXs: boolean;
  cartsSubscription: Subscription;

  constructor(private userService: UserService,
              private cartService: CartService,
              private alertService: AlertService,
              private mediaObserver: MediaObserver) {
  }

  ngOnInit() {
    this.getUser();
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.displayXs = change.mqAlias === 'xs';
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
        this.cart = carts.filter((cart) => cart.status === 'current')[0];
        if (!this.cart) {
          this.createCart();
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error.message);
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
        }
      });
  }

  createCart() {
    const cart: Cart = {
      user: this.user.uid,
      items: [],
      total: 0,
      status: 'current',
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.cartService.createCart(cart)
      .then(doc => {
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
      .then(() => {
        },
        (err: HttpErrorResponse) => {
          this.alertService.show(err.error.message);
        });
  }

  onSaveCart(cart: Cart) {
    this.cart = cart;
    this.cartPaymentComponent.setCart(cart);
    this.isCartCompleted = true;

    // Content loading issue
    setTimeout(() => {
      this.stepper.next();
    }, 200);
  }

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
            .then(() => {
              this.cartPaymentComponent.setCart(this.cart);
              setTimeout(() => {
                this.stepper.next();
              }, 200);
            }, (err: HttpErrorResponse) => {
              this.alertService.show(err.error.message);
            });
        }
      }, (err: HttpErrorResponse) => {
        this.alertService.show(err.error.message);
      });
  }

  onCancel(event: boolean) {
    if (event === true) {
      this.stepper.previous();
    }
  }

  onPaid(payment: Payment) {
    this.cartConfirmationComponent.setPayment(payment);
    this.isPaymentCompleted = true;
    this.isPaymentConfirmed = true;

    setTimeout(() => {
      this.stepper.next();
    }, 200);
  }
}
