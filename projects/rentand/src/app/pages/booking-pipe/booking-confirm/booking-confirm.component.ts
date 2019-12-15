import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Booking, BookingWithEvents } from '../../../shared/interfaces/booking';
import { BookingsService } from '../../../shared/services/bookings.service';
import { Event } from '../../../shared/interfaces/event';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.scss']
})
export class BookingConfirmComponent implements OnInit {

  booking: Booking;
  events: Event[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookingsService: BookingsService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.bookingsService.getUserBookingWithEvents(params.id))
      )
      .subscribe((bookingWithEvents: BookingWithEvents) => {
        if (bookingWithEvents.booking) {
          this.booking = bookingWithEvents.booking;
        }
        if (bookingWithEvents.events && bookingWithEvents.events.length > 0) {
          this.events = bookingWithEvents.events;
        }
      });
  }

  getBookingMonoTitle(booking): string {
    if (booking && booking.mono && booking.mono.firstname && booking.mono.lastname) {
      return booking.mono.firstname + ' ' + booking.mono.lastname;
    }
    return '';
  }

}
