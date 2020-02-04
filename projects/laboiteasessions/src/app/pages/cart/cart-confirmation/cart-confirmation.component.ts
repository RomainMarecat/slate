import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/interfaces/order';
import { Payment } from '../../../shared/interfaces/payment';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: ['./cart-confirmation.component.scss']
})
export class CartConfirmationComponent implements OnInit {

  payment: Payment;
  order: Order;

  constructor(private orderService: OrderService,
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

  getCart(id: string) {
    this.cartService.getCart(id)
      .subscribe((cart: Cart) => {
        cart.status = 'finished';
        this.cartService.updateCart(cart)
          .subscribe(() => {
          });
      });
  }
}
