import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/services/auth.service';
import { BookingsService } from '../../shared/services/bookings.service';
import { CartService } from '../cart/shared/cart.service';
import { BookingPipeMessage } from './booking-pipe-message';
import { BookingPipeService } from './booking-pipe.service';

@Component({
  selector: 'app-booking-pipe',
  templateUrl: './booking-pipe.component.html',
  styleUrls: ['./booking-pipe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingPipeComponent implements OnInit {

  selectedIndex = 0;

  constructor(public authService: AuthService,
              public bookingPipeService: BookingPipeService,
              public bookingService: BookingsService,
              private router: Router,
              private route: ActivatedRoute,
              private cartService: CartService,
              public snackBar: MatSnackBar,
              private translateService: TranslateService,
  ) {
    this.route.params.subscribe(params => {
      this.bookingPipeService.setCurrentCart(this.cartService.getMonoCart(params.id));
    });
  }

  ngOnInit() {
  }


  slideToLoginTab() {
    const bookingId = this.bookingPipeService.getCurrentBookingId();
    if (bookingId) {
      this.bookingService.deleteBookingWithEvents(bookingId).subscribe((resp) => {
        this.bookingPipeService.setCurrentBookingId(null);
        this.openSnackBar({
          msg: 'Your course is not locked anymore',
          action: 'ok',
          classes: ['red']
        });
        this.selectedIndex = 0;
      });
    } else {
      this.selectedIndex = 0;
    }
  }

  slideToInfosTab() {
    const bookingId = this.bookingPipeService.getCurrentBookingId();
    if (bookingId) {
      this.bookingService.deleteBookingWithEvents(bookingId).subscribe((resp) => {
        this.bookingPipeService.setCurrentBookingId(null);
        this.openSnackBar({
          msg: this.translateService.instant('booking_pipe.session_unlocked'),
          action: 'ok',
          classes: ['red']
        });
        this.selectedIndex = 1;
      });
    } else {
      this.selectedIndex = 1;
    }
  }

  slideToPaymentTab() {
    this.selectedIndex = 2;
    this.openSnackBar({
      msg: this.translateService.instant('booking_pipe.session_locked'),
      action: 'ok',
      classes: ['green']
    });
  }

  openSnackBar(pipeMessage: BookingPipeMessage) {

    const snackBarRef = this.snackBar.open(
      pipeMessage.msg,
      pipeMessage.action, {
        duration: pipeMessage.duration || 5000,
        panelClass: pipeMessage.classes || ['orange']
      });


    snackBarRef.afterDismissed().subscribe(() => {
      if (pipeMessage.redirectTo) {
        this.router.navigate([pipeMessage.redirectTo]);
      }
    });

    snackBarRef.onAction().subscribe(() => {
      if (pipeMessage.redirectTo) {
        this.router.navigate([pipeMessage.redirectTo]);
      }
    });
  }
}
