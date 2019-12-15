import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, BookingPayment } from '../../../../shared/interfaces/booking';
import { BookingsService } from '../../../../shared/services/bookings.service';
import { CartService } from '../../../cart/shared/cart.service';

@Component({
  selector: 'app-stripe-form',
  templateUrl: './stripe-form.component.html',
  styleUrls: ['./stripe-form.component.scss']
})
export class StripeFormComponent {

  handler: any;

  constructor(private bookingsService: BookingsService,
              private router: Router,
              private cartService: CartService) {
  }

  openCheckout(bookingId: string, booking: Booking) {
    if (!booking || !booking.stripe_pkey || !booking.stripe_skey) {
      return;
    }
    const pkey = booking.stripe_pkey;
    const skey = booking.stripe_skey;
    this.handler = (window as any).StripeCheckout.configure({
      key: pkey,
      image: 'STRIPE API KEY',
      locale: 'auto',
      token: (token) => {
        const bookingPayment: BookingPayment = {
          token: token.id,
          booking_id: bookingId,
          key: skey,
          amount: booking.price * 100,
          currency: 'EUR'
        };
        this.bookingsService.validateBookingPayment(bookingId, bookingPayment)
          .subscribe((res) => {
            this.cartService.deleteMonoCart(booking.coach.id);
            this.router.navigate(['/booking/confirm/', bookingId]);
          });
      },
      error: (error) => {
      }
    });
    this.handler.open({
      name: 'rentand',
      description: this.getBookingMonoTitle(booking),
      zipCode: false,
      amount: booking.price * 100,
      email: booking.customer && booking.customer.email ? booking.customer.email : 'test@rentand.com',
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
