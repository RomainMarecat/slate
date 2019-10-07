import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../cart/shared/cart.service';
import { Address, Delivery } from '../../../cart/shared/delivery';
import { DeliveryService } from '../../../cart/shared/delivery.service';
import { Cart } from '../../../cart/shared/cart';
import { AlertService } from '../../../popup/alert.service';
import { BaseEditComponent } from '../../base/base-edit/base-edit.component';
import { CartFormType } from '../../shared/cart/form-cart';

@Component({
  selector: 'app-admin-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: ['./cart-edit.component.scss']
})
export class CartEditComponent extends BaseEditComponent<Cart> implements OnInit {

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
              protected cartService: CartService,
              protected localizeRouterService: LocalizeRouterService,
              private deliveryService: DeliveryService) {
    super(activatedRoute, router, alertService, cartService, localizeRouterService);
    this.createForm();
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.cartService.getCart(key)
          .subscribe((document: Cart) => {
            this.document = document;
            this.getDelivery(this.document);
            this.createForm();
          });
      }
    });
  }

  createForm() {
    const formType = new CartFormType(this.document);
    this.form = formType.getForm();
  }

  saveDocument() {
    if (this.form.valid) {
      this.document = {...this.document, ...this.form.value};
      this.updatePublished();
      if (this.document.key) {
        this.updateDocument();
        return;
      }
      this.createDocument();
    }
  }

  updatePublished() {
    if (this.document['published'] === true) {
      this.document['published_at'] = new Date();
    }
  }

  createDocument() {
    this.cartService.createDocument(this.document)
      .then((doc: DocumentReference) => {
        this.alertService.show(`cart added ${doc.id}`);
        this.reset();
        this.router.navigate([this.localizeRouterService.translateRoute('/admin/cart')]);
      }, (err) => {
        this.alertService.show(`cart error ${err}`);
      });
  }

  updateDocument() {
    this.cartService.updateDocument(this.document)
      .then((doc) => {
        this.alertService.show(`document updated ${this.document.key}`);
        this.reset();
        this.router.navigate([this.localizeRouterService.translateRoute('/admin/cart')]);
      }, (err) => {
        this.alertService.show(`cart error ${err}`);
      });
  }

  /**
   * Change cart status to payment accepted
   */
  onConfirmPayment() {
    const cart: Cart = this.document;

    cart.status = 'payment_authorized';
    cart.updated_at = new Date();

    const updateCartSubscription: Subscription = this.cartService.updateCart(cart)
      .subscribe(() => {
        if (updateCartSubscription) {
          updateCartSubscription.unsubscribe();
        }
      });
  }

  /**
   * Change cart to payment cancelled
   */
  markPaymentAsCancelled() {
    const cart: Cart = this.document;

    cart.status = 'payment_cancelled';
    cart.updated_at = new Date();

    this.cartService.updateCart(cart).subscribe();
  }

  setFilterDelivery(cart: Cart) {
    this.deliveryService.filters$.next([
      {
        column: 'cart',
        operator: 'array-contains',
        value: cart.key
      }
    ]);
  }

  /**
   * get single delivery by cart key
   */
  getDelivery(cart: Cart) {
    if (cart.key) {
      this.setFilterDelivery(cart);
      this.getDeliveries();
    }
  }

  getDeliveries() {
    const deliverySubscription: Subscription = this.deliveryService.getDeliveries()
      .subscribe((deliveries) => {
        if (deliveries && deliveries.length) {
          this.delivery = deliveries[0];
          this.deliveryAddress = CartEditComponent.setAddressText(this.delivery.address);
          this.billingAddress = CartEditComponent.setAddressText(this.delivery.billing);
        }

        if (deliverySubscription) {
          deliverySubscription.unsubscribe();
        }
      });
  }

  /**
   * Copy a text to clipboard with directive ngxClipboard
   * Symply alert user that the text was copied
   */
  copied() {
    this.alertService.openBottomSheetMessage({title: '', message: 'admin.cart-edit.copied_text'});
  }
}
