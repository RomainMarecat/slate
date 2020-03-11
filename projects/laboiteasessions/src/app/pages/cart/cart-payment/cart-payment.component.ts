import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import {
  ElementOptions,
  Elements,
  ElementsOptions,
  Error,
  StripeCardComponent,
  StripeService,
  TokenResult
} from 'ngx-stripe';
import { Observable } from 'rxjs';
import { take, timeout } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from '../../../shared/interfaces/cart';
import { Delivery } from '../../../shared/interfaces/delivery';
import { Payment } from '../../../shared/interfaces/payment';
import { UserService } from '../../../shared/services/user.service';
import { OrderService } from '../../../shared/services/order.service';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { Order } from '../../../shared/interfaces/order';
import { ProductService } from '../../../shared/services/product.service';
import { User } from '../../../shared/interfaces/user';
import { PaymentService } from '../../../shared/services/payment.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
  @ViewChild('cardInfo', {static: false}) cardInfo: ElementRef;

  cart: Cart;

  user: User;

  delivery: Delivery;

  error: Error;

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

  payment: Payment;

  disablePayButton = false;

  constructor(private paymentService: PaymentService,
              private orderService: OrderService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private stripeService: StripeService,
              private productService: ProductService,
              private authenticationService: AuthenticationService,
              private deliveryService: DeliveryService) {
  }

  ngOnInit() {
    this.getUser().subscribe((user) => this.user = user);
    this.getCart()
      .subscribe((cart) => {
        if (cart.state !== 'payment') {
          this.router.navigate([
            '/cart',
            cart.state
          ]);
          return;
        }
        this.cart = cart;
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

  getDelivery(cart: Cart) {
    this.deliveryService.getDeliveryFromCart(cart)
      .subscribe((delivery: Delivery) => {
        this.delivery = delivery;
      });
  }

  cancel() {
    this.router.navigate(['/cart/delivery']);
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
    this.error = null;
    this.togglePayButton();
    if (form.valid) {
      this.createToken(this.user);
      return;
    }

    // Undefined cart or undefined total
    this.handleErrorResponse({message: 'form.invalid'} as HttpErrorResponse);
    this.togglePayButton();
  }

  createToken(user: User): void {
    this.stripeService
      .createToken(this.card.getCard(), {name: user.email})
      .pipe(timeout(5000))
      .subscribe((result: TokenResult) => {
        if (result.token) {
          this.saveOrder(this.createOrder(result));
        } else if (result.error) {
          // Error creating the token
          this.handleErrorResponse(result.error);
          this.togglePayButton();
        }
      }, (err) => {
        this.handleErrorResponse(err);
      });
  }

  saveOrder(order: Order) {
    // Never never process charge here with access token from your secret id
    // send the token to the your backend to process the charge
    this.orderService.createOrder(order)
      .subscribe((createdOrder) => {
        this.onPaid(createdOrder);
      }, (err) => {
        this.handleErrorResponse(err);
        this.togglePayButton();
      });
  }

  /**
   * On fill and validate payment
   */
  onPaid(order: Order) {
    this.router.navigate(
      [
        '/order',
        'confirmation',
        order.id
      ]
    );
  }

  createOrder(result: TokenResult): Order {
    // Use the token to create a charge or a customer
    // https://stripe.com/docs/charges
    this.payment = {
      id: null,
      order: null,
      token: result.token,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return {
      id: null,
      cart: this.cart.id as unknown as Cart,
      total: this.cart.total,
      user: this.cart.user,
      order_items: this.cart.items.map(i => {
        return {...i, ...{media: i.product.media}};
      }),
      status: null,
      delivery_fee: 0,
      delivery: this.delivery.id as unknown as Delivery,
      payment: this.payment,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  togglePayButton() {
    this.disablePayButton = !this.disablePayButton;
  }

  handleErrorResponse(err: HttpErrorResponse | Error) {
    if (typeof err.message === 'string') {
      this.error = err as Error;
    }
  }
}
