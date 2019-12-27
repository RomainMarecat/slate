import { Component, OnInit, Input } from '@angular/core';
import { Booking, BookingWithEvents } from '../../../shared/interfaces/booking';
import { Event } from '../../../shared/interfaces/event';

@Component({
  selector: 'app-booking-mono-card',
  templateUrl: './booking-mono-card.component.html',
  styleUrls: ['./booking-mono-card.component.scss']
})
export class BookingMonoCardComponent implements OnInit {

  @Input() booking: Booking;

  constructor() { }

  ngOnInit() {
  }

  getBookingMonoTitle(booking): string {
    if (booking && booking.mono && booking.mono.firstname && booking.mono.lastname) {
      return booking.mono.firstname + ' ' + booking.mono.lastname;
    }
    return '';
  }
}
