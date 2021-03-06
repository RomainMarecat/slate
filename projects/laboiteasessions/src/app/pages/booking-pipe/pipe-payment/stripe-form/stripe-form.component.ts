import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, BookingPayment } from '../../../../shared/interfaces/booking';
import { BookingsService } from '../../../../shared/services/bookings.service';

@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.scss']
})
export class StripeFormComponent {

  handler: any;

  constructor(private bookingsService: BookingsService,
              private router: Router) {
  }

  openCheckout(bookingId: string, booking: Booking) {
    if (!booking || !booking.stripe_pkey || !booking.stripe_skey) {
      return;
    }

    this.configureStripe(bookingId, booking);

    this.openStripe(booking);
  }

  configureStripe(bookingId: string, booking: Booking) {
    const pkey = booking.stripe_pkey;
    const skey = booking.stripe_skey;
    const handleToken = (token) => {
      const bookingPayment: BookingPayment = {
        token: token.id,
        booking_id: bookingId,
        key: skey,
        amount: booking.price * 100,
        currency: 'EUR'
      };
      this.bookingsService.validateBookingPayment(bookingId, bookingPayment)
        .subscribe((res) => {
          this.router.navigate(['/booking/confirm/', bookingId]);
        });
    };

    this.handler = (window as any).StripeCheckout.configure({
      key: pkey,
      image: 'STRIPE API KEY',
      locale: 'auto',
      token: handleToken
    });
  }

  openStripe(booking: Booking) {
    this.handler.open({
      name: 'laboiteasessions',
      description: this.getBookingMonoTitle(booking),
      zipCode: false,
      amount: booking.price * 100,
      email: booking.customer && booking.customer.email ? booking.customer.email : 'test@laboiteasessions.com',
      allowRememberMe: false,
      currency: 'EUR',
      closed() {
      }
    });
  }

  getBookingMonoTitle(booking: Booking): string {
    if (booking && booking.coach && booking.coach.user_metadata.firstname && booking.coach.user_metadata.lastname) {
      return booking.coach.user_metadata.firstname + ' ' + booking.coach.user_metadata.lastname;
    }
    return '';
  }
}
