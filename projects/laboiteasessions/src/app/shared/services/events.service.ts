import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingWithEvents } from '../interfaces/booking';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private publicEventsUrl = `${environment.middleware}/v1/public/events`;
  private secureEventsUrl = `${environment.middleware}/v1/restricted/events`;

  constructor(private http: HttpClient) {
  }

  getAllUserEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.publicEventsUrl}/user_id/${userId}`);
  }

  getAllUserEventsDateRange(userId: string, start: string, end: string): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.publicEventsUrl}/user_id/${userId}/start/${start}/end/${end}?sort={start_date:1, start_time: 1}`);
  }

  createBooking(bookingWithEvents: BookingWithEvents): Observable<Booking> {
    const url = `${this.secureEventsUrl}/booking/online`;
    return this.http.post<Booking>(url, JSON.stringify(bookingWithEvents));
  }
}
