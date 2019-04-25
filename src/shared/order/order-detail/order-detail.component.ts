import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '../shared/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { AlertService } from '../../popup/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Delivery } from '../../cart/shared/delivery';
import { DeliveryService } from '../../cart/shared/delivery.service';
import { Observable, Subscription } from 'rxjs';
import { PaymentService } from '../../payment/shared/payment.service';
import { Payment } from '../../payment/shared/payment';

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

  totalArticles: number;

  loading = false;

  downloadingInvoice = false;

  downloadingEticket = false;

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
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getOrder()
      .subscribe((order: Order) => {
        this.getDelivery(order);
        this.getPayment(order);
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
              console.log(order);
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
          this.payment = payments[0];
          console.log(this.payment);
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

  downloadInvoice(order: Order) {
    // this.orderService.getInvoice(order.key)
    //   .subscribe(res => {
    //     const url = window.URL.createObjectURL(res);
    //     window.open(url);
    //     const anchor = document.createElement('a');
    //     anchor.href = url;
    //     anchor.download = order.key;
    //     anchor.click();
    //   }, (err: HttpErrorResponse) => {
    //     this.alertService.show(err.error);
    //   });
  }


  downloadTickets(orderItem: OrderItem) {
    if (orderItem) {
      // this.orderService.getEtickets(this.order.key)
      //   .subscribe(res => {
      //     res.forEach((ticket: PdfData) => {
      //       const url = window.URL.createObjectURL(
      //         FileService.b64toBlob(ticket.data, ticket.type)
      //       );
      //       window.open(url);
      //       const anchor = document.createElement('a');
      //       anchor.href = url;
      //       anchor.download = ticket.name;
      //       anchor.click();
      //     });
      //   }, (err: HttpErrorResponse) => {
      //     this.alertService.show('L\'e-billet n\'a pas pu être trouvé.');
      //   });
    } else {
      this.alertService.show('L\'e-billet n\'a pas pu être trouvé.');
    }
  }
}
