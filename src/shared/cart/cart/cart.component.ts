import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Cart } from 'shared/cart/shared/cart';
import { MatStepper } from '@angular/material';
import { CartPaymentComponent } from 'shared/cart/cart-payment/cart-payment.component';
import { Payment } from 'shared/cart/shared/payment';
import { CartConfirmationComponent } from 'shared/cart/cart-confirmation/cart-confirmation.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.scss' ]
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild(CartPaymentComponent) cartPaymentComponent: CartPaymentComponent;
  @ViewChild(CartConfirmationComponent) cartConfirmationComponent: CartConfirmationComponent;
  constructor(public userService: UserService) {
  }

  ngOnInit() {
  }

  onSaveCart(cart: Cart) {
    this.cartPaymentComponent.setCart(cart);
    this.stepper.next();
  }

  onLogin() {
    this.userService.getLoginGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.stepper.next();
        }
      }, (err) => {
        console.error(err);
      });
  }

  onPaid(payment: Payment) {
    this.cartConfirmationComponent.setPayment(payment);
    this.stepper.next();
  }
}
