import { Component, OnInit } from '@angular/core';
import { Order } from '../../order/shared/order';
import { OrderService } from '../../order/shared/order.service';
import { AlertService } from '../../popup/alert.service';
import { Payment } from '../../payment/shared/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/cart';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: ['./cart-confirmation.component.scss']
})
export class CartConfirmationComponent implements OnInit {

  payment: Payment;
  order: Order;

  constructor(private orderService: OrderService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        this.orderService.getOrder(value.key)
          .subscribe((order) => {
            this.order = order;
            this.getCart(order.cart);
          }, () => {
          });
      }
    });
  }

  getCart(key: string) {
    this.cartService.getCart(key)
      .subscribe((cart: Cart) => {
        cart.status = 'finished';
        this.cartService.updateCart(cart)
          .subscribe(() => {
          });
      });
  }
}
