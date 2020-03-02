import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((value: {id: string}) => {
      if (value.id) {
        this.orderService.getOrder(value.id)
          .subscribe((order) => {
            this.order = order;
          }, () => {
          });
      }
    });
  }
}
