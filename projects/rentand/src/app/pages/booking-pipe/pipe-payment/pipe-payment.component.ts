import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Booking, BookingWithEvents } from '../../../shared/interfaces/booking';
import { Event } from '../../../shared/interfaces/event';
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

  booking: Booking;
  events: Event[];
  bookingId: string;

  constructor(private bookingPipeService: BookingPipeService,
              private authService: AuthService) {
    this.bookingPipeService.currentBookingId$.subscribe((bookingId: string) => {
      this.bookingId = bookingId;
    });
    this.bookingPipeService.currentRequest$.subscribe((bookingWithEvents: BookingWithEvents) => {
      this.booking = bookingWithEvents.booking;
      this.events = bookingWithEvents.events;
    });
  }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  stripePayement() {
    this.stripeFormComponent.openCheckout(this.bookingId, this.booking);
  }
}
