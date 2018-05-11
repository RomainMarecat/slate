import { Observable } from 'rxjs/Observable';
import { Booking } from './booking';
import { of } from 'rxjs/observable/of';
import { mockBooking } from './mock-booking';

export class MockBookingService {

  getBookings(): Observable<Booking[]> {
    return of([mockBooking]);
  }

  getBooking(key: string): Observable<Booking> {
    return of(mockBooking);
  }
}
