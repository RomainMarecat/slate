import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
import { Booking } from '../../../shared/interfaces/booking';
import { Event } from '../../../shared/interfaces/event';

const moment = _moment;

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit {

  @Input() booking: Booking;
  @Input() events: Event[];

  locale: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.getBrowserLang();
    moment.locale(this.locale);
  }

  sessionDurationDisplay(session: Event): string {
    if (session
      && session.start_date && session.start_time
      && session.end_date && session.end_time) {
      const mmtStart = moment(session.start_date + session.start_time, 'YYYY-MM-DDHH:mm');
      const mmtEnd = moment(session.end_date + session.end_time, 'YYYY-MM-DDHH:mm');
      const duration = mmtEnd.diff(mmtStart, 'minutes');
      return moment.duration(duration, 'minutes').humanize();
    }
    return '';
  }

  sessionStartDisplay(session: Event): string {
    if (session
      && session.start_date && session.start_time
      && session.end_date && session.end_time) {
      const mmtStart = moment(session.start_date + session.start_time, 'YYYY-MM-DDHH:mm');
      return mmtStart.format('ddd DD MMM YYYY');
    }
    return '';
  }

  sessionSport(session: Event): string {
    return session
    && session.details
    && session.details.sport
    && session.details.sport.trans
    && session.details.sport.trans[this.locale] ?
      session.details.sport.trans[this.locale] : '';
  }

  sessionCity(session: Event): string {
    let city = '';
    if (session
      && session.details
      && session.details.city
      && session.details.city.name) {
      city = session.details.city.name;
      if (session.details.meeting_point && session.details.meeting_point.title) {
        city += ' - ' + session.details.meeting_point.title;
      }
    }
    return city;
  }

  bookingLevel(events: Event[]) {
    if (events && events.length > 0
      && events[0].details && events[0].details.level
      && events[0].details.level.trans && events[0].details.level.trans[this.locale]) {
      return events[0].details.level.trans[this.locale];
    }
    return 'unknown';
  }

  bookingAge(events: Event[]) {
    if (events && events.length > 0
      && events[0].details && events[0].details.age
      && events[0].details.age.trans && events[0].details.age.trans[this.locale]) {
      return events[0].details.age.trans[this.locale];
    }
    return 'unknown';
  }

  getBookingCustomerTitle(booking): string {
    if (booking && booking.customer && booking.customer.firstname && booking.customer.lastname) {
      return booking.customer.firstname + ' ' + booking.customer.lastname;
    }
    return '';
  }
}
