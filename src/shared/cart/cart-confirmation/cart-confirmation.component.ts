import { Component, OnInit } from '@angular/core';
import { Payment } from 'shared/cart/shared/payment';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: [ './cart-confirmation.component.scss' ]
})
export class CartConfirmationComponent implements OnInit {

  payment: Payment;

  constructor() {
  }

  ngOnInit() {
  }

  setPayment(payment: Payment) {
    this.payment = payment;
  }
}
