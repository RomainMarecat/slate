import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseError } from 'firebase';
import { User } from 'firebase/app';
import {
  ElementOptions,
  Elements,
  ElementsOptions,
  Error,
  StripeCardComponent,
  StripeService,
  TokenResult
} from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoaderService } from '../../loader/loader.service';
import { Order, OrderItem } from '../../order/shared/order';
import { OrderService } from '../../order/shared/order.service';
import { Payment } from '../../payment/shared/payment';
import { PaymentService } from '../../payment/shared/payment.service';
import { AlertService } from '../../popup/alert.service';
import { Product } from '../../product/shared/product';
import { ProductService } from '../../product/shared/product.service';
import { UserService } from '../../user/shared/user.service';
import { onlineStatus$ } from '../../util/online-status';
import { RoutingState } from '../../util/routing-state';
import { Cart } from '../shared/cart';
import { CartService } from '../shared/cart.service';
import { Delivery } from '../shared/delivery';
import { DeliveryService } from '../shared/delivery.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', {static: false}) cardInfo: ElementRef;

  _cart: Cart;

  @Input() user: User;

  @Input() delivery: Delivery;

  onLine: boolean;

  error: Error | FirebaseError;

  @Output() paid: EventEmitter<any> = new EventEmitter<any>();

  @Output() cancelled: EventEmitter<boolean> = new EventEmitter<boolean>();

  elements: Elements;

  @ViewChild(StripeCardComponent, {static: false}) card: StripeCardComponent;

  elementsOptions: ElementsOptions = {
    locale: 'fr'
  };
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  cardHandler = this.onChange.bind(this);

  form: FormGroup = new FormGroup({});
  payment: Payment;

  // Url
  previousRoute: string;

  disablePayButton = false;

  constructor(private paymentService: PaymentService,
              private orderService: OrderService,
              private userService: UserService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private routingState: RoutingState,
              private cd: ChangeDetectorRef,
              private stripeService: StripeService,
              private productService: ProductService,
              private loaderService: LoaderService,
              private deliveryService: DeliveryService) {
  }

  ngOnInit() {
    this.previousRoute = this.routingState.getPreviousUrl() || '/cart';
    onlineStatus$().subscribe((online: boolean) => {
      this.onLine = online;
    });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  @Input() set cart(cart: Cart) {
    if (cart) {
      this._cart = cart;
      this.getDelivery(cart);
    }
  }

  get cart(): Cart {
    return this._cart;
  }

  getDelivery(cart: Cart) {
    this.deliveryService.filters$.next([
      {
        column: 'cart',
        operator: 'array-contains',
        value: cart.key
      }
    ]);
    const subscription: Subscription = this.deliveryService.getDeliveries()
      .subscribe((deliveries: Delivery[]) => {
        if (deliveries && deliveries.length) {
          this.delivery = deliveries[0];
        }
        if (subscription) {
          subscription.unsubscribe();
        }
      }, () => {
        this.alertService.openAlertMessage(
          {title: '', message: 'cart-payment.errors.delivery'},
          {panelClass: 'alert-danger'}
        );
      });
  }

  cancel() {
    this.router.navigate([this.previousRoute]);
    this.cancelled.emit(true);
  }

  onChange(event: any) {
    if (event && event.event && event.event.error) {
      this.error = event.event.error;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  onSubmit(form: NgForm) {
    this.loaderService.show();
    this.togglePayButton();
    if (this.userService.getUser() &&
      this.userService.getUser().uid &&
      this.cart &&
      this.delivery &&
      this.cart.total) {
      this.createToken();
    } else {
      // Undefined cart or undefined total
      this.alertService.openAlertMessage(
        {title: '', message: 'cart-payment.errors.cart'},
        {panelClass: 'alert-danger'}
      );
      this.togglePayButton();
      this.loaderService.hide();
    }
  }

  createToken(): void {
    this.stripeService
      .createToken(this.card.getCard(), {name: this.userService.getUser().email})
      .subscribe((result: TokenResult) => {
        if (result.token) {
          const order = this.createOrder(result);
          this.saveOrder(order);
        } else if (result.error) {
          // Error creating the token
          this.handleErrorResponse(result.error);
          this.togglePayButton();
        }
      });
  }

  saveOrder(order: Order) {
    // Never never process charge here with access token from your secret key
    // send the token to the your backend to process the charge
    this.orderService.createOrder(order)
      .subscribe((createdOrder) => {
        order.key = createdOrder.id;
        this.orderService.updateOrder(order)
          .subscribe(() => {
            this.payment.order = order.key;
            this.savePayment(order);
          }, (err) => {
            this.handleErrorResponse(err);
            this.togglePayButton();
          });
      }, (err) => {
        this.handleErrorResponse(err);
        this.togglePayButton();
      });
  }

  savePayment(order: Order) {
    this.paymentService.createPayment(this.payment)
      .subscribe((createdPayment: DocumentReference) => {
        this.payment.key = createdPayment.id;
        this.paymentService.updatePayment(this.payment)
          .subscribe(() => {
            this.cart.state = 'confirmation';
            this.cart.order = order.key;

            this.updateCart(order);

            this.togglePayButton();
          }, (err) => {
            this.handleErrorResponse(err);
            this.togglePayButton();
          });
      }, (err) => {
        this.handleErrorResponse(err);
        this.togglePayButton();
      });
  }

  updateCart(order: Order) {
    this.cartService.updateCart(this.cart)
      .subscribe(() => {
        this.paid.emit(this.payment);
        this.paymentService.payment$.next(this.payment);
        this.updateDelivery(order);

        this.updateOrderedProducts(order);

        this.loaderService.hide();
      }, (err) => {
        this.handleErrorResponse(err);
        this.togglePayButton();
      });
  }

  updateDelivery(order: Order) {
    if (!this.delivery.order) {
      this.delivery.order = [];
    }
    if (!this.delivery.order.includes(order.key)) {
      this.delivery.order.push(order.key);
    }
    this.deliveryService.updateDelivery(this.delivery)
      .subscribe(() => {
          // async save delivery order key
        },
        (err) => {
          this.handleErrorResponse(err);
        });
  }

  createOrder(result: TokenResult): Order {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    const order: Order = {
      cart: this.cart.key,
      total: this.cart.total,
      user: this.cart.user,
      items: this.cart.items,
      status: 'capture_authorized',
      delivery_fee: 0,
      delivery: this.delivery.key,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.payment = {
      token: result.token,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return order;
  }

  updateOrderedProducts(order: Order) {
    order.items.forEach((orderItem: OrderItem) => {
      this.productService.updateProductByKey(orderItem.code, {ordered: orderItem.quantity} as Product)
        .pipe(
          take(1)
        )
        .subscribe(() => {
        });
    });
  }


  togglePayButton() {
    this.disablePayButton = !this.disablePayButton;
  }

  handleErrorResponse(err: HttpErrorResponse | FirebaseError | Error) {
    if (typeof err.message === 'string') {
      this.error = err as FirebaseError | Error;

      this.alertService.openAlertMessage(
        {title: '', message: err.message},
        {panelClass: 'alert-danger'}
      );
    }
    if (err instanceof HttpErrorResponse) {
      this.alertService.openAlertMessage(
        {title: '', message: err.error.message},
        {panelClass: 'alert-danger'}
      );
    }
    this.loaderService.hide();
  }
}
