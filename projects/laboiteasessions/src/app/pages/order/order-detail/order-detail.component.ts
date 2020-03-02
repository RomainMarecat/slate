import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../../../shared/interfaces/order';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  /**
   * Order informations
   */
  order: Order;

  /**
   * Total articles number shortcut variable
   */
  totalArticles: number;

  /**
   * Loading page boolean
   */
  loading = false;

  /**
   * Etickets template informations
   */
  hasEtickets = false;


  static orderHasEtickets(order: Order): boolean {
    return order.order_items.filter((item) => {
      return item.is_eticket === true;
    }).length > 0;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrder()
      .subscribe((order: Order) => {
        this.hasEtickets = OrderDetailComponent.orderHasEtickets(order);
      });
  }

  /**
   * La commande en détail en prenant le cart historique id
   */
  getOrder(): Observable<Order> {
    return new Observable((observer) => this.activatedRoute.params
      .subscribe((value: {key: string}) => {
        if (value && value.key) {
          const orderSubscription: Subscription = this.orderService.getOrder(value.key)
            .subscribe((order: Order) => {
              this.order = order;
              this.totalArticles = this.order.order_items.reduce((acc, next) => {
                return acc + (next.quantity * next.price);
              }, 0);
              if (orderSubscription) {
                orderSubscription.unsubscribe();
              }
              observer.next(order);
            }, (err: HttpErrorResponse) => {
              observer.error(err.error);
            });
        }
      }));
  }
}
