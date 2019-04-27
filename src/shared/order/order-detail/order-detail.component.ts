import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Delivery } from '../../cart/shared/delivery';
import { DeliveryService } from '../../cart/shared/delivery.service';
import { Payment } from '../../payment/shared/payment';
import { PaymentService } from '../../payment/shared/payment.service';
import { AlertService } from '../../popup/alert.service';
import { Shipping } from '../../shipping/shared/shipping';
import { ShippingService } from '../../shipping/shared/shipping.service';
import { Order } from '../shared/order';
import { OrderService } from '../shared/order.service';

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
   * Delivery from order
   */
  delivery: Delivery;

  /**
   * Payment informations
   */
  payment: Payment;

  /**
   * Shipping informations
   */
  shipping: Shipping;

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
    return order.items.filter((item) => {
      return item.is_eticket === true;
    }).length > 0;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private deliveryService: DeliveryService,
              private paymentService: PaymentService,
              private shippingService: ShippingService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getOrder()
      .subscribe((order: Order) => {
        this.getDelivery(order);
        this.getPayment(order);
        this.getShipping(order);
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
              this.totalArticles = this.order.items.reduce((acc, next) => {
                return acc + (next.quantity * next.price);
              }, 0);
              if (orderSubscription) {
                orderSubscription.unsubscribe();
              }
              observer.next(order);
            }, (err: HttpErrorResponse) => {
              this.alertService.show(err.error);
              observer.error(err.error);
            });
        }
      }));
  }

  /**
   * Shipping informations
   */
  getShipping(order: Order) {
    if (order.key) {
      this.shippingService.filters$.next([
        {
          column: 'order',
          operator: '==',
          value: order.key
        }
      ]);
      const shippingSubscription: Subscription = this.shippingService.getShippings()
        .subscribe((shippings) => {
          if (shippings && shippings.length) {
            this.shipping = shippings[0];
          }
          if (shippingSubscription) {
            shippingSubscription.unsubscribe();
          }
        });
    }
  }

  /**
   * Payment informations
   */
  getPayment(order: Order) {
    if (order.key) {
      this.paymentService.filters$.next([
        {
          column: 'order',
          operator: '==',
          value: order.key
        }
      ]);
      const paymentSubscription: Subscription = this.paymentService.getPayments()
        .subscribe((payments) => {
          if (payments && payments.length) {
            this.payment = payments[0];
          }
          if (paymentSubscription) {
            paymentSubscription.unsubscribe();
          }
        });
    }
  }

  getDelivery(order: Order) {
    if (order.cart) {
      this.deliveryService.filters$.next([
        {
          column: 'order',
          operator: 'array-contains',
          value: order.key
        }
      ]);
      const deliverySubscription: Subscription = this.deliveryService.getDeliveries()
        .subscribe((deliveries) => {
          this.delivery = deliveries[0];
          if (deliverySubscription) {
            deliverySubscription.unsubscribe();
          }
        });
    }
  }
}
