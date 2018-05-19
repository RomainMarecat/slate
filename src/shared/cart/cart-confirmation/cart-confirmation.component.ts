import { Component, OnInit } from '@angular/core';
import { Payment } from 'shared/payment/shared/payment';
import { Order } from '../../order/shared/order';
import { OrderService } from '../../order/shared/order.service';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: [ './cart-confirmation.component.scss' ]
})
export class CartConfirmationComponent implements OnInit {

  payment: Payment;
  order: Order;

  constructor(private orderService: OrderService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  setPayment(payment: Payment) {
    this.payment = payment;
    this.orderService.getOrder(payment.order)
      .subscribe((order: Order) => this.order = order,
        (err) => {
          console.error(err);
          this.alertService.show(err);
        });
  }
}
