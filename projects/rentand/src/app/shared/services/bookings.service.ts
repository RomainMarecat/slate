import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingPayment, BookingWithEvents } from '../interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  secureBookingsUrl = `${environment.middleware}/v1/secure/bookings`;

  bookingsChangedSource = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getAllUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.secureBookingsUrl}/customer`);
  }

  getUserBooking(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.secureBookingsUrl}/${id}`);
  }

  getUserBookingWithEvents(id: string): Observable<BookingWithEvents> {
    const url = `${this.secureBookingsUrl}/events/${id}`;
    return this.http.get<BookingWithEvents>(url);
  }

  validateBookingPayment(bookingId: string, bookingPayment: BookingPayment) {
    const url = `${this.secureBookingsUrl}/payment/${bookingId}`;
    return this.http.post(url, bookingPayment);
  }

  deleteBooking(booking: Booking): Observable<Response> {
    const url = `${this.secureBookingsUrl}/manual/${booking.id}`;
    return this.http.delete<Response>(url);
  }


  deleteBookingWithEvents(bookingId: string): Observable<Response> {
    const url = `${this.secureBookingsUrl}/online/${bookingId}`;
    return this.http.delete<Response>(url);
  }

  updateBooking(booking: Booking): Observable<Booking> {
    return this.http.patch<Booking>(`${this.secureBookingsUrl}/manual/${booking.id}`, booking);
  }

  announceBookingsChange() {
    this.bookingsChangedSource.next();
  }

}
