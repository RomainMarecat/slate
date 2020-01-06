import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking, BookingWithEvents } from '../../../shared/interfaces/booking';
import { Event } from '../../../shared/interfaces/event';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { AppState } from '../../../shared/store/app.state';
import { selectLoggedIn } from '../../../shared/store/user/selectors/user.selector';
import { BookingPipeService } from '../booking-pipe.service';
import { StripeFormComponent } from './stripe-form/stripe-form.component';

@Component({
  selector: 'app-pipe-payment',
  templateUrl: './pipe-payment.component.html',
  styleUrls: ['./pipe-payment.component.scss']
})
export class PipePaymentComponent implements OnInit {

  @Output()
  slideToInfosTab: EventEmitter<any> = new EventEmitter();

  @ViewChild('stripeForm', {static: false}) stripeFormComponent: StripeFormComponent;

  authenticated$: Observable<boolean>;

  booking: Booking;
  events: Event[];
  bookingId: string;

  constructor(private bookingPipeService: BookingPipeService,
              private authenticationService: AuthenticationService,
              private store: Store<AppState>) {
    this.bookingPipeService.currentBookingId$.subscribe((bookingId: string) => {
      this.bookingId = bookingId;
    });
    this.bookingPipeService.currentRequest$.subscribe((bookingWithEvents: BookingWithEvents) => {
      this.booking = bookingWithEvents.booking;
      this.events = bookingWithEvents.events;
    });
  }

  ngOnInit() {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    return this.store.select(selectLoggedIn);
  }

  stripePayement() {
    this.stripeFormComponent.openCheckout(this.bookingId, this.booking);
  }
}
