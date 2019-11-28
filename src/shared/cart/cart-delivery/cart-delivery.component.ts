import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs';
import { AlertService } from '../../popup/alert.service';
import { Cart } from '../shared/cart';
import { Delivery } from '../shared/delivery';
import { DeliveryService } from '../shared/delivery.service';

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent {

  _cart: Cart;

  @Output() acceptDelivery: EventEmitter<Cart> = new EventEmitter<Cart>();

  disableDeliveryButton: boolean;

  form: FormGroup = CartDeliveryComponent.getForm();

  isDeliveryAddressFormActive: boolean;

  isBillingAddressFormActive: boolean;

  myPreviousDeliveries: Delivery[] = [];

  deliveryConfig: {
    display_add_address_button: boolean,
    display_add_billing_button: boolean,
    display_billing_form: boolean,
    display_billing_resume: boolean
    display_address_resume: boolean
  } = {
    display_billing_form: false,
    display_billing_resume: false,
    display_address_resume: false,
    display_add_address_button: true,
    display_add_billing_button: true
  };

  _user: User;

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  static getForm(delivery: Delivery = null): FormGroup {
    return new FormGroup({
      key: new FormControl(delivery && delivery.key ? delivery.key : null),
      user: new FormControl(delivery && delivery.user ? delivery.user : null),
      cart: new FormControl(delivery && delivery.cart ? delivery.cart : []),
      order: new FormControl(delivery && delivery.order ? delivery.order : []),
      address: CartDeliveryComponent.getChildForm('address', delivery),
      billing: CartDeliveryComponent.getChildForm('billing', delivery)
    });
  }

  static getChildForm(type: string, delivery: Delivery = null): FormGroup {
    return new FormGroup({
      email: new FormControl(delivery && delivery[type] && delivery[type].email ? delivery[type].email : '',
        [Validators.required, Validators.minLength(1), Validators.email]
      ),
      firstname: new FormControl(
        delivery && delivery[type] && delivery[type].firstname ? delivery[type].firstname : '',
        [Validators.required, Validators.minLength(1)]
      ),
      lastname: new FormControl(
        delivery && delivery[type] && delivery[type].lastname ? delivery[type].lastname : '',
        [Validators.required, Validators.minLength(1)]
      ),
      address: new FormControl(
        delivery && delivery[type] && delivery[type].address ? delivery[type].address : '',
        [Validators.required, Validators.minLength(1)]
      ),
      address_complement: new FormControl(
        delivery && delivery[type] && delivery[type].address_complement ? delivery[type].address_complement : '',
        []
      ),
      zipcode: new FormControl(
        delivery && delivery[type] && delivery[type].zipcode ? delivery[type].zipcode : '',
        [Validators.required, Validators.minLength(4)]
      ),
      city: new FormControl(
        delivery && delivery[type] && delivery[type].city ? delivery[type].city : '',
        [Validators.required, Validators.minLength(2)]
      ),
      country: new FormControl(
        delivery && delivery[type] && delivery[type].country ? delivery[type].country : '',
        [Validators.required, Validators.minLength(2)]
      )
    });
  }

  constructor(private deliveryService: DeliveryService,
              private alertService: AlertService) {
  }

  @Input() set cart(cart: Cart) {
    this._cart = cart;
  }

  get cart(): Cart {
    return this._cart;
  }

  @Input() set user(user: User) {
    if (user) {
      this._user = user;
      this.getPreviousDeliveries(user);
    }
  }

  getPreviousDeliveries(user: User) {
    this.deliveryService.filters$.next([
      {
        column: 'user',
        operator: '==',
        value: user.uid
      }
    ]);

    const subscription: Subscription = this.deliveryService.getDeliveries()
      .subscribe((deliveries: Delivery[]) => {
        this.myPreviousDeliveries = deliveries.map((delivery: Delivery) => {
          delivery.address.title = `${delivery.address.lastname} ${delivery.address.firstname} ${delivery.address.address} ` +
            `${delivery.address.zipcode} ${delivery.address.city} ${delivery.address.country}`;

          return delivery;
        });
        if (subscription) {
          subscription.unsubscribe();
        }

        if (this.cart) {
          // After get cart then get delivery associated to cart
          this.getDelivery();
        }
      }, () => {
        this.myPreviousDeliveries = [];
      });
  }

  getDelivery() {
    this.deliveryService.filters$.next([
      {
        column: 'cart',
        operator: 'array-contains',
        value: this.cart.key
      }
    ]);

    const subscription: Subscription = this.deliveryService.getDeliveries()
      .subscribe((deliveries: Delivery[]) => {
        if (deliveries[0]) {
          this.isDeliveryAddressFormActive = true;
          this.deliveryConfig.display_billing_form = true;
          this.form = CartDeliveryComponent.getForm(deliveries[0]);
        }
        if (subscription) {
          subscription.unsubscribe();
        }
      });
  }

  onDeliveryChange(change: MatSelectChange) {
    if (change.value) {
      this.form.patchValue(change.value);
      this.deliveryConfig.display_add_address_button = false;
      this.deliveryConfig.display_add_billing_button = false;
      this.deliveryConfig.display_billing_form = false;
      this.deliveryConfig.display_billing_resume = true;
      this.deliveryConfig.display_address_resume = true;
      return;
    }

    this.form.reset();
    this.deliveryConfig.display_add_address_button = true;
    this.deliveryConfig.display_add_billing_button = true;
    this.deliveryConfig.display_address_resume = false;
    this.deliveryConfig.display_billing_resume = false;
    this.deliveryConfig.display_billing_form = true;
  }

  showDeliveryChoice() {
    this.form.get('address').reset();
    this.isDeliveryAddressFormActive = false;
    this.deliveryConfig.display_add_address_button = true;
    this.deliveryConfig.display_address_resume = false;
  }

  showBillingChoice() {
    this.form.get('billing').reset();
    this.isBillingAddressFormActive = false;
    this.deliveryConfig.display_billing_resume = false;
    this.deliveryConfig.display_add_billing_button = true;
    this.deliveryConfig.display_billing_form = false;
  }

  activeDeliveryAddress() {
    this.isDeliveryAddressFormActive = true;
  }

  activeBillingAddress() {
    this.isBillingAddressFormActive = true;
    this.deliveryConfig.display_billing_form = true;
  }

  isBillingActivable(): boolean {
    return (this.isBillingAddressFormActive || this.form.get('billing').valid) && this.deliveryConfig.display_billing_form;
  }

  isDeliveryCompleted(): boolean {
    return this.form.get('address').valid && this.deliveryConfig.display_billing_form;
  }

  copyDeliveryIntoBilling() {
    this.form.patchValue({billing: this.form.get('address').value});
  }

  saveDelivery() {
    if (this.form.valid && this.cart && this.cart.key && this.cart.user) {
      this.disableDeliveryButton = true;
      const delivery: Delivery = {...this.form.value, ...{user: this.cart.user}};
      if (!delivery.cart || !delivery.cart.length) {
        delivery.cart = [];
      }
      if (!delivery.cart.includes(this.cart.key)) {
        delivery.cart.push(this.cart.key);
      }

      if (!delivery.key) {
        delivery.created_at = new Date();
      }

      delivery.updated_at = new Date();

      this.createDelivery(delivery);
      return;
    }
  }

  createDelivery(delivery: Delivery) {
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
  }

  handleError() {
    this.disableDeliveryButton = false;

    if (!navigator.onLine) {
      this.alertService.openAlertMessage(
        {title: '', message: 'error.no-internet-connection'},
        {panelClass: 'alert-danger'}
      );
      return;
    }

    this.alertService.openAlertMessage(
      {title: '', message: 'delivery.error.validate-delivery'},
      {panelClass: 'alert-danger'}
    );
  }

  cancel() {
    this.cancelled.emit(true);
  }

}
