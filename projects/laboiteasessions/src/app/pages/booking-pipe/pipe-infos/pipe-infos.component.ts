import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { BookingWithEvents } from '../../../shared/interfaces/booking';
import { Parameter } from '../../../shared/interfaces/parameter';
import { User } from '../../../shared/interfaces/user';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { EventsService } from '../../../shared/services/events.service';
import { UserService } from '../../../shared/services/user.service';
import { AppState } from '../../../shared/store/app.state';
import { selectLoggedIn } from '../../../shared/store/user/selectors/user.selector';
import { MonoCart } from '../../cart/shared/cart';
import { CartService } from '../../cart/shared/cart.service';
import { BookingPipeMessage } from '../booking-pipe-message';
import { BookingPipeService } from '../booking-pipe.service';

@Component({
  selector: 'app-pipe-infos',
  templateUrl: './pipe-infos.component.html',
  styleUrls: ['./pipe-infos.component.scss']
})
export class PipeInfosComponent implements OnInit {

  user: User;
  age: Parameter;
  level: Parameter;
  currentCart: MonoCart;
  bookingWithEvents: BookingWithEvents;

  @Output()
  slideToPaymentTab: EventEmitter<any> = new EventEmitter();

  @Output()
  slideToLoginTab: EventEmitter<any> = new EventEmitter();

  @Output() notifyUser: EventEmitter<BookingPipeMessage> = new EventEmitter();

  form: FormGroup;

  authenticated$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private translateService: TranslateService,
              private eventsService: EventsService,
              private userService: UserService,
              private bookingPipeService: BookingPipeService,
              private cartService: CartService,
              private store: Store<AppState>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.authenticated$ = this.store.select(selectLoggedIn);

    this.bookingPipeService.currentCart$.subscribe((cart) => {
      this.currentCart = cart;
    });
    this.currentCart = this.bookingPipeService.getCurrentCart();


    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
      this.getForm();
    });
  }

  getForm() {
    this.form = this.formBuilder.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
      ]],
      mother_lang: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]],
    });
  }

  updateLevel($event) {
    this.level = $event;
  }

  updateAge($event) {
    this.age = $event;
  }

  processBooking() {
  }

  // processBooking() {
  //   if (this.form.valid && this.age !== undefined && this.level !== undefined && this.currentCart !== undefined) {
  //
  //     // cloning the cart to write inside
  //     const finalCart = JSON.parse(JSON.stringify(this.currentCart));
  //     let fullPrice = 0;
  //
  //     this.bookingWithEvents = {
  //       booking: {} as Booking,
  //       events: []
  //     };
  //
  //     // for each session, adding the level && age, then pushing it in the bookingwithevents object
  //     finalCart.cart_items.forEach((item) => {
  //       item.session.details.level = this.level;
  //       item.session.details.age = this.age;
  //       delete item.session.details.age._etag;
  //       delete item.session.details.age._etag;
  //       item.session.details.event_type = 'session';
  //
  //       this.bookingWithEvents.events.push(item.session);
  //
  //       // incrementing the full price
  //       fullPrice += item.session.details.price;
  //       delete item.session.details.price;
  //     });
  //
  //     fullPrice = parseFloat(fullPrice.toFixed(2));
  //     this.authenticationService.getUser()
  //       .subscribe(user => {
  //         this.user = user;
  //
  //         // filling up the booking
  //         this.bookingWithEvents.booking = {
  //           id: null,
  //           coach: finalCart.mono as User,
  //           stripe_pkey: finalCart.mono.app_metadata.stripe.pkey,
  //           stripe_skey: finalCart.mono.app_metadata.stripe.skey,
  //           customer: user,
  //           addedByMono: false,
  //           isPayed: false,
  //           price: fullPrice
  //         };
  //
  //
  //         // updating user
  //         const user_metadata = this.user.user_metadata;
  //         this.user = null;
  //
  //         if (this.authenticationService.updateUser(this.user)) {
  //           this.eventsService.createBooking(this.bookingWithEvents).subscribe((booking) => {
  //             this.bookingPipeService.setCurrentRequest(this.bookingWithEvents);
  //             this.bookingPipeService.setCurrentBookingId(booking.id);
  //             this.slideToPaymentTab.emit();
  //           }, (error) => {
  //
  //             let pipeMessage: BookingPipeMessage;
  //             switch (error.status) {
  //               case 403:
  //                 // Forbidden : the course in not available anymore. Notifying the user and deleting the cart
  //                 this.cartService.deleteMonoCart(finalCart.mono.user_id);
  //
  //                 pipeMessage = {
  //                   msg: this.translateService.instant('booking_pipe.payment_access_403_forbidden'),
  //                   action: 'ok',
  //                   classes: ['red'],
  //                   duration: 5000,
  //                   redirectTo: 'profils/' + finalCart.mono.user_metadata.slug
  //                 };
  //                 break;
  //               default:
  //                 pipeMessage = {
  //                   msg: error.statusText,
  //                   action: 'ok',
  //                   classes: ['red'],
  //                   duration: 0
  //                 };
  //                 break;
  //             }
  //
  //             this.notifyUser.emit(pipeMessage);
  //           });
  //         }
  //       });
  //   }
  // }
}
