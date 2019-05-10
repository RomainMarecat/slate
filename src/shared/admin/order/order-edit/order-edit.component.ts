import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { Subscription } from 'rxjs';
import { Address, Delivery } from '../../../cart/shared/delivery';
import { DeliveryService } from '../../../cart/shared/delivery.service';
import { Order } from '../../../order/shared/order';
import { OrderService } from '../../../order/shared/order.service';
import { AlertService } from '../../../popup/alert.service';
import { BaseEditComponent } from '../../base/base-edit/base-edit.component';
import { OrderFormType } from '../../shared/order/form-order';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent extends BaseEditComponent<Order> implements OnInit {

  billingAddress: string;

  deliveryAddress: string;

  delivery: Delivery;

  static setAddressText(address: Address): string {
    return address.firstname + ' ' +
      address.firstname + ' ' +
      address.address + ' ' +
      address.address_complement + ' ' +
      address.zipcode + ' ' +
      address.country + ' ';
  }

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected alertService: AlertService,
              protected orderService: OrderService,
              protected localizeRouterService: LocalizeRouterService,
              private deliveryService: DeliveryService) {
    super(activatedRoute, router, alertService, orderService, localizeRouterService);
    this.createForm();
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.orderService.getOrder(key)
          .subscribe((document: Order) => {
            this.document = document;
            this.getDelivery(this.document);
            this.createForm();
          });
      }
    });
  }

  createForm() {
    const formType = new OrderFormType(this.document);
    this.form = formType.getForm();
  }

  saveDocument() {
    if (this.form.valid) {

      this.document = {...this.document, ...this.form.value};

      if (this.document['published'] === true) {
        this.document['published_at'] = new Date();
      }
      if (this.document.key) {
        this.orderService.updateDocument(this.document)
          .then((doc) => {
            this.alertService.show(`document updated ${this.document.key}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/order')]);
          }, (err) => {
            this.alertService.show(`order error ${err}`);
          });
      } else {
        this.orderService.createDocument(this.document)
          .then((doc: DocumentReference) => {
            this.alertService.show(`order added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/order')]);
          }, (err) => {
            this.alertService.show(`order error ${err}`);
          });
      }
    }
  }

  /**
   * Change order status to payment accepted
   */
  onConfirmPayment() {
    const order: Order = this.document;

    order.status = 'payment_authorized';
    order.updated_at = new Date();

    const updateOrderSubscription: Subscription = this.orderService.updateOrder(order)
      .subscribe(() => {
        if (updateOrderSubscription) {
          updateOrderSubscription.unsubscribe();
        }
      });
  }

  /**
   * Change order to payment cancelled
   */
  markPaymentAsCancelled() {
    const order: Order = this.document;

    order.status = 'payment_cancelled';
    order.updated_at = new Date();

    this.orderService.updateOrder(order).subscribe();
  }

  /**
   * get single delivery by order key
   */
  getDelivery(order: Order) {
    if (order.key) {
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
          this.deliveryAddress = OrderEditComponent.setAddressText(this.delivery.address);
          this.billingAddress = OrderEditComponent.setAddressText(this.delivery.billing);

          if (deliverySubscription) {
            deliverySubscription.unsubscribe();
          }
        });
    }
  }

  /**
   * Copy a text to clipboard with directive ngxClipboard
   * Symply alert user that the text was copied
   */
  copied() {
    this.alertService.openBottomSheetMessage({title: '', message: 'admin.order-edit.copied_text'});
  }
}
