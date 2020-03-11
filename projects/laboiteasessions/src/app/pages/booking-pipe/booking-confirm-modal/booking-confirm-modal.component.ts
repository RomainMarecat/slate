import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Booking, BookingWithEvents } from '../../../shared/interfaces/booking';
import { BookingsService } from '../../../shared/services/bookings.service';
import { Event } from '../../../shared/interfaces/event';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-confirm-modal',
  templateUrl: './booking-confirm-modal.component.html',
  styleUrls: ['./booking-confirm-modal.component.scss']
})
export class BookingConfirmModalComponent implements OnInit {

  booking: Booking;
  events: Event[];

  constructor(public dialogRef: MatDialogRef<BookingConfirmModalComponent>,
              private translateService: TranslateService,
              private bookingsService: BookingsService,
              @Inject(MAT_DIALOG_DATA) public data: string) {
  }

  ngOnInit() {
    this.bookingsService.getUserBookingWithEvents(this.data)
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
