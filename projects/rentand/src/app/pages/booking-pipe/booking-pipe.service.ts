import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { BookingWithEvents } from '../../shared/interfaces/booking';
import { MonoCart } from '../cart/shared/cart';


@Injectable()
export class BookingPipeService {

  private currentCartObj: MonoCart;
  private currentRequestObj: BookingWithEvents;
  private currentBookingId: string;

  private currentCart = new Subject<MonoCart>();
  currentCart$ = this.currentCart.asObservable();

  private currentRequestSubject = new Subject<BookingWithEvents>();
  currentRequest$ = this.currentRequestSubject.asObservable();

  private currentBookingIdSubject = new Subject<string>();
  currentBookingId$ = this.currentBookingIdSubject.asObservable();

  constructor(
    private translateService: TranslateService, private authService: AuthService
  ) {
  }

  setCurrentCart(cart: MonoCart) {
    this.currentCartObj = cart;
    this.currentCart.next(cart);
  }

  getCurrentCart(): MonoCart {
    return this.currentCartObj;
  }

  setCurrentRequest(bookingWithEvents: BookingWithEvents) {
    this.currentRequestObj = bookingWithEvents;
    this.currentRequestSubject.next(bookingWithEvents);
  }

  getCurrentRequest(): BookingWithEvents {
    return this.currentRequestObj;
  }

  setCurrentBookingId(id: string) {
    this.currentBookingId = id;
    this.currentBookingIdSubject.next(id);
  }

  getCurrentBookingId(): string {
    return this.currentBookingId;
  }

  accessAllowedToInfosAndPrev() {
    return this.authService.isAuthenticated();
  }

  accessAllowedToPaymentAndPrev() {
    return this.authService.isAuthenticated() && this.getCurrentBookingId();
  }
}
