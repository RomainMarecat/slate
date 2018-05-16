import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild, Output, EventEmitter, Input
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreditCardValidator } from '../shared/credit-card-validator';
import { ExpValidator } from '../shared/exp-validator';
import { PaymentService } from '../shared/payment.service';
import { CardForm, Payment } from '../shared/payment';
import { Order } from '../../order/shared/order';
import { Cart, CartError, CreditCardList } from '../shared/cart';
import { UserService } from '../../user/user.service';
import { AlertService } from '../../popup/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { RoutingState } from '../../util/routing-state';
import { OrderService } from '../../order/shared/order.service';

declare var stripe: any;
declare var elements: any;

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: [ './cart-payment.component.scss' ]
})
export class CartPaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() cart: Cart;

  // V3
  card: any;
  cardHandler = this.onChange.bind(this);
  error: CartError;
  @Output() paid: EventEmitter<any> = new EventEmitter<any>();

  // V2
  @ViewChild('creditCardInput') creditCardInput: ElementRef;
  creditCardClass = 'cartebleue';
  payment: Payment;
  handler: any;
  creditCardError: boolean;
  form: FormGroup = CardForm.getForm();

  // Url
  previousRoute: string;

  constructor(private paymentService: PaymentService,
              private orderService: OrderService,
              private userService: UserService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private routingState: RoutingState,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.previousRoute = this.routingState.getPreviousUrl();
    this.getCart();
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

  @HostListener('window:popstate') onPopstate() {
    if (this.handler) {
      this.handler.close();
    }
  }

  updateCreditCard(event?: any) {
    const card = this.creditCardInput.nativeElement.value.replace(/[^0-9]/g, '');
    for (let i = 0; i < CreditCardList.getCreditCardList().list.length; i++) {
      if (card.match(new RegExp(CreditCardList.getCreditCardList().list[ i ].verification))) {
        CreditCardList.getCreditCardList().active = i;
        this.creditCardClass = CreditCardList.getCreditCardList().list[ i ].css_class;
        if (!CreditCardList.getCreditCardList().list[ i ].accepted) {
          this.creditCardError = true;
        }
        break;
      }
    }
  }

  pay() {
    if (this.form.valid) {
      const order: Order = {
        total: this.cart.total,
        user: this.userService.getUser().uid
      };

      this.payment = {
        ...this.form.value,
      };

      this.paymentService.createPayment(this.payment)
        .then((doc) => {
          this.payment.key = doc.id;
          this.paymentService.updatePayment(this.payment)
            .then(() => {
              console.log('payment', this.payment);
              this.handler.open({
                name: 'payment',
                excerpt: 'pay',
                amount: order.total
              });
            }, (err) => {
              this.alertService.show(err);
            });
        }, (err) => {
          this.alertService.show(err);
        });
    }
    Object.entries(this.form.controls).forEach(([ key, value ]) => {
      console.log(key, 'valid: ', value.valid, 'value: ', value.value, 'errors: ', value.errors);
    });
  }

  cancel() {
    this.router.navigate([ this.previousRoute ]);
  }

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };
    if (elements) {
      this.card = elements.create('card', {style});
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.cardHandler);
    }
  }

  ngOnDestroy() {
    if (this.card) {
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  onChange({error}) {
    if (error) {
      this.error = error;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  setCart(cart: Cart) {
    this.cart = cart;
  }

  async onSubmit(form: NgForm) {
    const {token, error} = await stripe.createToken(this.card, {
      email: this.userService.getUser().email
    });

    if (error) {
      this.handleError(error);
    } else {
      const order: Order = {
        total: this.cart.total,
        user: this.userService.getUser().uid
      };

      console.log(token);
      this.payment = {
        token: token,
        created_at: new Date(),
        updated_at: new Date()
      };
      // Never never process charge here with access token from your secret key
      // send the token to the your backend to process the charge
      this.orderService.createOrder(order)
        .then((createdOrder) => {
          order.key = createdOrder.id;
          this.orderService.updateOrder(order)
            .then(() => {
              this.paymentService.createPayment(this.payment)
                .then((createdPayment) => {
                  this.payment.key = createdPayment.id;
                  this.paymentService.updatePayment(this.payment)
                    .then(() => {
                      console.log('payment', this.payment);
                      this.paid.emit(this.payment);
                    }, (err) => {
                      this.alertService.show(err);
                    });
                }, (err) => {
                  this.alertService.show(err);
                });
            }, (err) => {
              this.alertService.show(err);
            });
        }, (err) => {
          this.alertService.show(err);
        });
    }
  }

  handleError(error: CartError) {
    console.error(error);
    if (error && error.message) {
      this.alertService.show(error.message);
    }
  }
}
