import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user/shared/user.service';
import { Cart } from 'shared/cart/shared/cart';
import { MatStepper } from '@angular/material';
import { CartPaymentComponent } from 'shared/cart/cart-payment/cart-payment.component';
import { Payment } from 'shared/payment/shared/payment';
import { CartConfirmationComponent } from 'shared/cart/cart-confirmation/cart-confirmation.component';
import { CartEditComponent } from '../cart-edit/cart-edit.component';
import { User } from '../../user/shared/user';
import { CartService } from '../shared/cart.service';
import { Filter } from 'shared/facet/filter/shared/filter';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
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

  constructor(private userService: UserService,
              private cartService: CartService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getCart() {
    this.cartService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: this.user.uid
      }
    ] as Filter[]);
    this.cartService.getCarts()
      .subscribe((carts) => {
        this.cart = carts.filter((cart) => cart.status === 'current')[0];
        if (!this.cart) {
          this.createCart();
        }
      }, (err) => {
        console.error(err);
      });
  }

  getUser() {
    this.userService.getAuthState()
      .subscribe((user) => {
        if (user) {
          this.isUserAlreadyLogged = true;
          this.isUserCompleted = true;
          this.user = user;
          if (this.cartEditComponent) {
            this.cartEditComponent.setUser(user);
          }
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
        this.cartService.updateCart(cart)
          .then(() => {
          }, (err) => this.alertService.show(err));
      }, (err) => this.alertService.show(err));
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
          this.cartEditComponent.setUser(user);
          this.cart.user = this.user.uid;
          this.cartService.updateCart(this.cart)
            .then(() => {
              this.cartPaymentComponent.setCart(this.cart);
              setTimeout(() => {
                this.stepper.next();
              }, 200);
            }, (err) => {
              console.error(err);
            });
        }
      }, (err) => {
        console.error(err);
      });
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
