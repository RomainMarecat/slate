import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input, AfterViewInit, OnDestroy
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { PaymentService } from '../../payment/shared/payment.service';
import { Payment } from '../../payment/shared/payment';
import { Order } from '../../order/shared/order';
import { Cart } from '../shared/cart';
import { UserService } from '../../user/shared/user.service';
import { AlertService } from '../../popup/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { RoutingState } from '../../util/routing-state';
import { OrderService } from '../../order/shared/order.service';
import {
  StripeService, Elements, Element as StripeElement, ElementsOptions, Error, ElementOptions,
  StripeCardComponent
} from 'ngx-stripe';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: [ './cart-payment.component.scss' ]
})
export class CartPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() cart: Cart;
  onLine: boolean;

  error: Error;
  @Output() paid: EventEmitter<any> = new EventEmitter<any>();
  elements: Elements;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

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
              private stripeService: StripeService) {
  }

  ngOnInit() {
    this.previousRoute = this.routingState.getPreviousUrl();
    this.getCart();
    this.onLine = navigator.onLine;
    // this.stripeService.elements(this.elementsOptions)
    //   .subscribe(elements => {
    //     this.elements = elements;
    //     // Only mount the element the first time
    //     if (!this.card) {
    //       // this.card = this.elements.create('card', {
    //       //   style: {
    //       //     base: {
    //       //       iconColor: '#666EE8',
    //       //       color: '#31325F',
    //       //       lineHeight: '40px',
    //       //       fontWeight: 300,
    //       //       fontFamily: 'monospace',
    //       //       fontSmoothing: 'antialiased',
    //       //       fontSize: '19px',
    //       //       '::placeholder': {
    //       //         color: '#6d6d6d'
    //       //       }
    //       //     }
    //       //   }
    //       // });
    //       // this.card.mount('#card-element');
    //     }
    //   });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  getCart() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
      if (value.key) {
        this.cartService.getCart(value.key)
          .subscribe((cart: Cart) => {
            this.cart = cart;
          }, (err) => {
            this.alertService.show(err);
          });
      }
    });
  }

  cancel() {
    this.router.navigate([ this.previousRoute ]);
  }

  onChange(event: any) {
    if (event && event.event && event.event.error) {
      this.error = event.event.error;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  setCart(cart: Cart) {
    this.cart = cart;
  }

  onSubmit(form: NgForm) {
    this.togglePayButton();
    if (this.userService.getUser().uid && this.cart && this.cart.total) {
      this.stripeService
        .createToken(this.card.getCard(), {name: this.userService.getUser().email})
        .subscribe(result => {
          if (result.token) {
            // Use the token to create a charge or a customer
            // https://stripe.com/docs/charges
            console.log(result.token);
            const order: Order = {
              total: this.cart.total,
              user: this.cart.user
            };

            this.payment = {
              token: result.token,
              created_at: new Date(),
              updated_at: new Date(),
            };
            // Never never process charge here with access token from your secret key
            // send the token to the your backend to process the charge
            this.orderService.createOrder(order)
              .then((createdOrder) => {
                order.key = createdOrder.id;
                this.orderService.updateOrder(order)
                  .then(() => {
                    this.payment.order = order.key;
                    this.paymentService.createPayment(this.payment)
                      .then((createdPayment) => {
                        this.payment.key = createdPayment.id;
                        this.paymentService.updatePayment(this.payment)
                          .then(() => {
                            console.log('payment', this.payment);
                            this.cart.status = 'finished';
                            this.cartService.updateCart(this.cart).then(() => {
                              console.log('cart updated');
                            });
                            this.paid.emit(this.payment);
                            this.togglePayButton();
                          }, (err) => {
                            this.alertService.show(err);
                            this.togglePayButton();
                          });
                      }, (err) => {
                        this.alertService.show(err);
                        this.togglePayButton();
                      });
                  }, (err) => {
                    this.alertService.show(err);
                    this.togglePayButton();
                  });
              }, (err) => {
                this.alertService.show(err);
                this.togglePayButton();
              });
          } else if (result.error) {
            // Error creating the token
            this.handleError(result.error);
            this.togglePayButton();
          }
        });
    } else {
      // Undefined cart or undefined total
      this.alertService.show('cart-payment.errors.cart');
      this.togglePayButton();
    }
  }

  togglePayButton() {
    this.disablePayButton = !this.disablePayButton;
  }

  handleError(error: Error) {
    this.error = error;
    console.error(error);
    if (error && error.message) {
      this.alertService.show(error.message);
    }
  }
}
