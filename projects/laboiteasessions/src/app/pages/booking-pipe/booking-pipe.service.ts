import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { BookingWithEvents } from '../../shared/interfaces/booking';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AppState } from '../../shared/store/app.state';
import { selectLoggedIn } from '../../shared/store/user/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class BookingPipeService {

  private currentRequestObj: BookingWithEvents;
  private currentBookingId: string;

  private currentRequestSubject = new Subject<BookingWithEvents>();
  currentRequest$ = this.currentRequestSubject.asObservable();

  private currentBookingIdSubject = new Subject<string>();
  currentBookingId$ = this.currentBookingIdSubject.asObservable();

  authenticated$: Observable<boolean>;

  constructor(private translateService: TranslateService,
              private authenticationService: AuthenticationService,
              private store: Store<AppState>) {
    this.accessAllowedToInfosAndPrev();
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
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  accessAllowedToPaymentAndPrev() {
    return this.getCurrentBookingId();
  }
}
