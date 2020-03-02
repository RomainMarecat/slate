import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { Delivery } from '../../../shared/interfaces/delivery';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { Cart } from '../../../shared/interfaces/cart';
import { take } from 'rxjs/operators';
import { CartService } from '../../../shared/services/cart.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { User } from '../../../shared/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-delivery',
  templateUrl: './cart-delivery.component.html',
  styleUrls: ['./cart-delivery.component.scss']
})
export class CartDeliveryComponent implements OnInit {

  cart: Cart;

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

  user: User;

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  isMinimalForm = CartService.containsOnlySessions;

  static getForm(delivery: Delivery = null, minimalForm: boolean = false): FormGroup {
    return new FormGroup({
      key: new FormControl(delivery && delivery.id ? delivery.id : null),
      user: new FormControl(delivery && delivery.user ? delivery.user : null),
      cart: new FormControl(delivery && delivery.carts ? delivery.carts : []),
      orders: new FormControl(delivery && delivery.orders ? delivery.orders : []),
      address: CartDeliveryComponent.getChildForm('address', minimalForm, delivery),
      billing: CartDeliveryComponent.getChildForm('billing', minimalForm, delivery)
    });
  }

  static getChildForm(type: string, minimalForm: boolean, delivery: Delivery = null): FormGroup {
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
      street: new FormControl(
        delivery && delivery[type] && delivery[type].street ? delivery[type].street : '',
        !minimalForm ? [Validators.required, Validators.minLength(1)] : []
      ),
      street_complement: new FormControl(
        delivery && delivery[type] && delivery[type].street_complement ?
          delivery[type].street_complement : '',
        []
      ),
      zipcode: new FormControl(
        delivery && delivery[type] && delivery[type].zipcode ? delivery[type].zipcode : '',
        !minimalForm ? [Validators.required, Validators.minLength(4)] : []
      ),
      city: new FormControl(
        delivery && delivery[type] && delivery[type].city ? delivery[type].city : '',
        !minimalForm ? [Validators.required, Validators.minLength(2)] : []
      ),
      country: new FormControl(
        delivery && delivery[type] && delivery[type].country ? delivery[type].country : '',
        !minimalForm ? [Validators.required, Validators.minLength(2)] : []
      )
    });
  }

  constructor(private deliveryService: DeliveryService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private cartService: CartService) {
    this.disableDeliveryButton = false;
  }

  ngOnInit() {
    combineLatest([
      this.getUser(),
      this.getCart()
    ]).subscribe(([user, cart]) => {
      this.cart = cart;
      this.user = user;
      this.getPreviousDeliveries(user, cart);
      // After get cart then get delivery associated to cart
      this.getDelivery(cart);
    });
  }

  getUser(): Observable<User> {
    return this.authenticationService.getUser();
  }

  getCart(): Observable<Cart> {
    this.cartService.filters$.next([
      {
        column: 'status',
        operator: '==',
        value: 'current'
      }
    ]);
    return this.cartService.getCurrentCart()
      .pipe(
        take(1)
      );
  }


  getPreviousDeliveries(user: User, cart: Cart) {
    this.deliveryService.getDeliveries()
      .pipe(
        take(1)
      )
      .subscribe((deliveries: Delivery[]) => {
        this.myPreviousDeliveries = deliveries.map((delivery: Delivery) => {
          delivery.address.title = `${delivery.address.lastname} ${delivery.address.firstname} ${delivery.address.street || ''} ` +
            `${delivery.address.zipcode || ''} ${delivery.address.city || ''} ${delivery.address.country || ''}`;

          return delivery;
        });

      }, () => {
        this.myPreviousDeliveries = [];
      });
  }

  getDelivery(cart: Cart) {
    this.deliveryService.getDeliveryFromCart(cart)
      .pipe(
        take(1)
      )
      .subscribe((delivery: Delivery) => {
        if (delivery) {
          this.isDeliveryAddressFormActive = true;
          this.deliveryConfig.display_billing_form = true;
          this.form = CartDeliveryComponent.getForm(delivery, CartService.containsOnlySessions(cart));
          return;
        }
        const newDelivery = {} as unknown as Delivery;
        newDelivery.carts = [cart];
        newDelivery.user = cart.user;
        this.form = CartDeliveryComponent.getForm(newDelivery, CartService.containsOnlySessions(cart));
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
    if (this.form.valid && this.cart && this.cart.id && this.cart.user) {
      this.disableDeliveryButton = true;
      const delivery: Delivery = {...this.form.value, ...{user: this.cart.user}};
      if (!delivery.carts || !delivery.carts.length) {
        delivery.carts = [];
      }
      if (!delivery.carts.map((cart) => cart.id).includes(this.cart.id)) {
        delivery.carts.push(this.cart);
      }

      if (!delivery.id) {
        delivery.created_at = new Date();
      }

      delivery.updated_at = new Date();

      this.createDelivery(delivery);
      return;
    }
  }

  createDelivery(delivery: Delivery) {
    this.deliveryService.createDelivery(delivery)
      .subscribe((createdDelivery: Delivery) => {
        this.form.patchValue(createdDelivery);
        this.acceptDelivery.emit(this.cart);
        this.cart.state = 'payment';
        this.cartService.updateCart(this.cart)
          .subscribe((cart: Cart) => {
            this.router.navigate(
              ['/cart', cart.state]
            );
          });
        this.disableDeliveryButton = false;
      }, () => {
        this.handleError();
      });
  }

  handleError() {
    // this.alertService.openAlertMessage(
    //   {title: '', message: 'delivery.error.validate-delivery'},
    //   {panelClass: 'alert-danger'}
    // );
  }

  isValid() {
    return Object.keys(this.form.controls).map((k) => {
      if (this.form.controls[k]) {
        return `${k} - ${this.form.controls[k].valid}`;
      }
      return k;
    });
  }

  cancel() {
    this.cartService.updateCart(this.cart)
      .subscribe(() => {
        this.router.navigate(
          ['/cart']
        );
      });
  }
}
