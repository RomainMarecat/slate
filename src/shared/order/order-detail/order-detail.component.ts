import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { AlertService } from '../../popup/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../product/shared/product';
import { Delivery } from '../../cart/shared/delivery';
import { DeliveryService } from '../../cart/shared/delivery.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  delivery: Delivery;

  loading = false;

  downloadingInvoice = false;

  downloadingEticket = false;

  constructor(private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private deliveryService: DeliveryService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.getOrder();
  }

  /**
   * La commande en détail en prenant le cart historique id
   */
  getOrder() {
    this.activatedRoute.params
      .subscribe((value: {key: string}) => {
        if (value && value.key) {
          this.orderService.getOrder(value.key)
            .subscribe((order: Order) => {
              this.order = order;
              this.getDelivery(order);

            }, (err: HttpErrorResponse) => {
              this.alertService.show(err.error);
            });
        }
      });
  }

  getDelivery(order: Order) {
    if (order.cart) {
      this.deliveryService.filters$.next([
        {
          column: 'cart',
          operator: '==',
          value: order.cart
        }
      ]);
      this.deliveryService.getDeliveries()
        .subscribe((deliveries) => this.delivery = deliveries[0]);
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


  downloadTickets(product: Product) {
    if (product) {
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
