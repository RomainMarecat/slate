import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../shared/cart';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Delivery } from '../shared/delivery';
import { DeliveryService } from '../shared/delivery.service';
import { DocumentReference } from '@angular/fire/firestore';
import { AlertService } from '../../popup/alert.service';

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {

  _cart: Cart;

  @Output() acceptDelivery: EventEmitter<Cart> = new EventEmitter<Cart>();

  disableDeliveryButton: boolean;

  form: FormGroup = CartDeliveryComponent.getForm();

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  static getForm(delivery: Delivery = null): FormGroup {
    return new FormGroup({
      key: new FormControl(delivery && delivery.key ? delivery.key : null),
      address: new FormGroup({
        email: new FormControl(delivery && delivery.address && delivery.address.email ? delivery.address.email : '',
          [Validators.required, Validators.minLength(1), Validators.email]
        ),
        address: new FormControl(
          delivery && delivery.address && delivery.address.address ? delivery.address.address : '',
          [Validators.required, Validators.minLength(1)]
        ),
        firstname: new FormControl(
          delivery && delivery.address && delivery.address.firstname ? delivery.address.firstname : '',
          [Validators.required, Validators.minLength(1)]
        ),
        lastname: new FormControl(
          delivery && delivery.address && delivery.address.lastname ? delivery.address.lastname : '',
          [Validators.required, Validators.minLength(1)]
        ),
        address_complement: new FormControl(
          delivery && delivery.address && delivery.address.address_complement ? delivery.address.address_complement : '',
          []
        ),
        zipcode: new FormControl(
          delivery && delivery.address && delivery.address.zipcode ? delivery.address.zipcode : '',
          [Validators.required, Validators.minLength(4)]
        ),
        city: new FormControl(
          delivery && delivery.address && delivery.address.city ? delivery.address.city : '',
          [Validators.required, Validators.minLength(2)]
        ),
        country: new FormControl(
          delivery && delivery.address && delivery.address.country ? delivery.address.country : '',
          [Validators.required, Validators.minLength(2)]
        )
      }),
      billing: new FormGroup({
        email: new FormControl(delivery && delivery.address && delivery.address.email ? delivery.address.email : '',
          [Validators.required, Validators.minLength(1), Validators.email]
        ),
        firstname: new FormControl(
          delivery && delivery.address && delivery.address.firstname ? delivery.address.firstname : '',
          [Validators.required, Validators.minLength(1)]
        ),
        lastname: new FormControl(
          delivery && delivery.address && delivery.address.lastname ? delivery.address.lastname : '',
          [Validators.required, Validators.minLength(1)]
        ),
        address: new FormControl(
          delivery && delivery.billing && delivery.billing.address ? delivery.billing.address : '',
          [Validators.required, Validators.minLength(1)]
        ),
        address_complement: new FormControl(
          delivery && delivery.billing && delivery.billing.address_complement ? delivery.billing.address_complement : '',
          []
        ),
        zipcode: new FormControl(
          delivery && delivery.billing && delivery.billing.zipcode ? delivery.billing.zipcode : '',
          [Validators.required, Validators.minLength(4)]
        ),
        city: new FormControl(
          delivery && delivery.billing && delivery.billing.city ? delivery.billing.city : '',
          [Validators.required, Validators.minLength(2)]
        ),
        country: new FormControl(
          delivery && delivery.billing && delivery.billing.country ? delivery.billing.country : '',
          [Validators.required, Validators.minLength(2)]
        )
      })
    });
  }

  constructor(private deliveryService: DeliveryService,
              private alertService: AlertService) {
  }

  @Input() set cart(cart: Cart) {
    this._cart = cart;
    // After get cart then get delivery associated to cart
    this.getDelivery();
  }

  get cart(): Cart {
    return this._cart;
  }

  ngOnInit() {
  }

  getDelivery() {
    this.deliveryService.filters$.next([
      {
        column: 'cart',
        operator: '==',
        value: this.cart.key
      }
    ]);
    this.deliveryService.getDeliverys()
      .subscribe((deliveries: Delivery[]) => {
        this.form = CartDeliveryComponent.getForm(deliveries[0]);
      });
  }

  isDeliveryCompleted(): boolean {
    return this.form.get('address').valid;
  }

  copyDeliveryIntoBilling() {
    this.form.patchValue({billing: this.form.get('address').value});
  }

  saveDelivery() {
    if (this.form.valid && this.cart && this.cart.key) {
      this.disableDeliveryButton = true;
      const delivery: Delivery = {...this.form.value, ...{cart: this.cart.key}};
      this.deliveryService.createDelivery(delivery)
        .subscribe((doc: DocumentReference) => {
          delivery.key = doc.id;
          this.form.patchValue(delivery);
          this.deliveryService.updateDelivery(delivery)
            .subscribe(() => {
              this.acceptDelivery.emit(this.cart);
              this.disableDeliveryButton = false;
            }, () => {
              this.handleError();
            });
        }, () => {
          this.handleError();
        });
      return;
    }
  }

  handleError() {
    this.disableDeliveryButton = false;

    if (!navigator.onLine) {
      this.alertService.show('error.no-internet-connection');
      return;
    }

    this.alertService.show('delivery.error.validate-delivery');
  }

  cancel() {
    this.cancelled.emit(true);
  }

}
