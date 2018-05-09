import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  ViewChildren,
  Renderer2,
  OnChanges
} from '@angular/core';
import { OnlineSession } from '../shared/online-session';
import { Session } from '../shared/session';
import { Event, EventType } from '../shared/event';
import * as moment from 'moment';
import { Moment } from 'moment';
import * as twix from 'twix';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: [ './calendar-week.component.scss' ]
})
export class CalendarWeekComponent implements OnInit, OnChanges {
  @Input() onlineSessions: OnlineSession[];
  @Input() onlineSession: OnlineSession;

  @Input() startDate: string = moment().format('YYYY-MM-DD');
  endDate: string;

  @Input() viewMode;

  @Output() onDateChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSessionCreated: EventEmitter<Session> = new EventEmitter<Session>();

  @ViewChildren('dayList') el: ElementRef;

  DATE_REGEXP: RegExp = /\d{4}-\d{2}-\d{2}/g;
  TIME_REGEXP = /\d{2}:\d{2}/g;

  startDatePretty: string;
  endDatePretty: string;
  prettyDays: Array<string>;
  days: Array<string>;
  trueDuration: number;

  mmtStartDate: Moment;
  mmtEndDate: Moment;

  daysAvailability: Map<string, string[]>;

  daysBusySlotNumber: Map<string, number>;
  daysAvailabilitySlotNumber: Map<string, number>;

  events: Event[];
  busySlots: Set<string>;
  earlySlots: Set<string>;
  pauseSlots: Set<string>;
  sessionsSlots: Set<string>;
  sessionsEndSlots: Set<string>;
  sessions: Map<string, Session>;

  slotDuration = 15;
  error: any;

  locale: string;

  constructor(private eventService: EventService,
              private cd: ChangeDetectorRef,
              private rd: Renderer2) {
  }

  ngOnInit() {
    this.defaultViewMode();
    this.initVars();
  }

  defaultViewMode() {
    this.viewMode = 'week';
    // if (this.deviceService.isMaterializeMediumOnly()) {
    //   this.viewMode = '3days';
    // } else if (this.deviceService.isMaterializeSmallAndDown()) {
    //   this.viewMode = 'day';
    // }
  }

  ngOnChanges() {
    this.buildDateRange();
  }

  initVars() {
    this.sessionsSlots = new Set();
    this.sessionsEndSlots = new Set();
    this.earlySlots = new Set();
    this.pauseSlots = new Set();
    this.sessions = new Map();
  }

  /************************************************
   *************** Navigation functions ************
   *************************************************/

  switchView(view: string) {
    this.viewMode = view;
    this.buildDateRange();
  }

  goToToday() {
    this.startDate = moment().format('YYYY-MM-DD');
    this.onDateChanged.emit(this.startDate);
    this.buildDateRange();
  }

  isToday() {
    return moment().format('YYYY-MM-DD') === this.startDate;
  }

  previousDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.startDate = moment(this.startDate, 'YYYY-MM-DD').subtract(daysNb, 'day').format('YYYY-MM-DD');
    this.onDateChanged.emit(this.startDate);
    this.buildDateRange();
  }

  nextDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.startDate = moment(this.startDate, 'YYYY-MM-DD').add(daysNb, 'day').format('YYYY-MM-DD');
    this.onDateChanged.emit(this.startDate);
    this.buildDateRange();
  }

  /************************************************
   ******************* Date functions **************
   *************************************************/

  buildTrueDuration() {
    if (this.onlineSession && this.onlineSession.session_type
      && this.onlineSession.session_type.duration !== undefined
      && this.onlineSession.session_type.pause !== undefined) {
      this.trueDuration = this.onlineSession.session_type.duration + this.onlineSession.session_type.pause;
    } else {
      this.trueDuration = 0;
    }
  }

  loadMonoEvents(start: string, end: string) {
    // this.eventService.getAllUserEventsDateRange(this.mono.auth0_id, start, end)
    //   .then((events) => {
    //     this.events = events;
    //     this.busySlots = new Set();
    //     this.daysBusySlotNumber = new Map();
    //     for (const i in events) {
    //       const mmtEventStart = moment(events[ i ].start_date + events[ i ].start_time, 'YYYY-MM-DDHH:mm');
    //       const mmtEventEnd = moment(events[ i ].end_date + events[ i ].end_time, 'YYYY-MM-DDHH:mm');
    //       if (!mmtEventStart || !mmtEventStart.isValid()
    //         || !mmtEventEnd || !mmtEventEnd.isValid()
    //         || !mmtEventStart.isBefore(mmtEventEnd)) {
    //         console.error('invalid dates');
    //         continue;
    //       }
    //       /* building busy slots by events*/
    //       let timeRange = mmtEventStart.twix(mmtEventEnd).iterate(this.slotDuration, 'minutes');
    //       while (timeRange.hasNext()) {
    //         const time = timeRange.next();
    //         if (time.minutes() % this.slotDuration !== 0) {
    //           time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
    //         }
    //         /* IF the busy slot is in availability and not already in busySloits we count it */
    //         if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
    //           && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
    //           && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
    //           let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
    //             this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
    //           dayBusyNumber++;
    //           this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
    //         }
    //         this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    //       }
    //       /* building earliest slot before event */
    //       const mmtEarlyStart = mmtEventStart.clone().subtract(this.trueDuration, 'minutes');
    //       mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
    //         (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
    //       timeRange = mmtEarlyStart.twix(mmtEventStart).iterate(this.slotDuration, 'minutes');
    //       while (timeRange.hasNext()) {
    //         const time = timeRange.next();
    //         if (time.minutes() % this.slotDuration !== 0) {
    //           time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
    //         }
    //         /* IF the busy slot is in availability and not already in busySloits we count it */
    //         if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
    //           && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
    //           && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
    //           let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
    //             this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
    //           dayBusyNumber++;
    //           this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
    //         }
    //         this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
    //       }
    //     }
    //     this.cd.markForCheck();
    //     this.restoreCartEvents();
    //   })
    //   .catch(error => this.error = error);
  }

  buildViewMode() {
    /* First we build the current date*/
    if (!this.startDate || !this.startDate.match(this.DATE_REGEXP)) {
      this.startDate = moment().format('YYYY-MM-DD');
    }
    /* Building view mode*/
    if (this.viewMode === 'day') {
      this.endDate = this.startDate;
    } else if (this.viewMode === 'week') {
      const firstDay = 0;
      this.startDate = moment(this.startDate, 'YYYY-MM-DD').day(firstDay).format('YYYY-MM-DD');
      this.endDate = moment(this.startDate, 'YYYY-MM-DD').add(6, 'days').format('YYYY-MM-DD');
    } else if (this.viewMode === '3days') {
      this.endDate = moment(this.startDate, 'YYYY-MM-DD').add(2, 'days').format('YYYY-MM-DD');
    } else {
      this.endDate = this.startDate;
    }
    this.startDatePretty = moment(this.startDate, 'YYYY-MM-DD').format('LL');
    this.endDatePretty = moment(this.endDate, 'YYYY-MM-DD').format('LL');
    this.mmtStartDate = moment(this.startDate, 'YYYY-MM-DD').startOf('day');
    this.mmtEndDate = moment(this.endDate, 'YYYY-MM-DD').endOf('day');
  }

  buildDateRange() {
    this.initVars();
    this.buildViewMode();
    this.buildTrueDuration();
    this.loadMonoEvents(this.startDate, this.endDate);
    this.daysAvailability = new Map();
    const dateRange = moment(this.startDate, 'YYYY-MM-DD').twix(moment(this.endDate, 'YYYY-MM-DD')).iterate(1, 'days');
    this.prettyDays = new Array();
    this.days = new Array();
    while (dateRange.hasNext()) {
      const date = dateRange.next();
      this.prettyDays.push(date.format('ddd DD MMM'));
      this.days.push(date.format('YYYY-MM-DD'));
      this.daysAvailability.set(date.format('YYYY-MM-DD'), new Array());
    }
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    if (!this.daysAvailability || !this.onlineSession) {
      return;
    }
    const duration = this.onlineSession.session_type.duration;
    const onlineSessionStart: Moment = moment(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
    const onlineSessionEnd: Moment = moment(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
    this.daysAvailabilitySlotNumber = new Map();
    this.daysAvailability.forEach((avbs, day) => {
      const slotsNumber = 0;
      const mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
      const mmtDayStartTime = moment(day + this.onlineSession.time_range.start, 'YYYY-MM-DDHH:mm');
      /* days before this morning */
      if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
        return;
      }
      /* booking delay */
      const minMmtStartTime = moment().add(this.onlineSession.session_type.booking_delay, 'hours');
      const mmtDayEndTime = moment(day + this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
      mmtDayEndTime.subtract(duration, 'minutes');
      const timeRange = mmtDayStartTime.twix(mmtDayEndTime).iterate(this.slotDuration, 'minutes');
      if (this.mmtStartDate && this.mmtEndDate && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
        while (timeRange.hasNext()) {
          const time = timeRange.next();
          // if (!time.isBefore(minMmtStartTime)) {
          //   avbs.push(time.format('HH:mm'));
          //   slotsNumber++;
          // }
        }
      }
      this.daysAvailabilitySlotNumber.set(day, slotsNumber);
    });
  }

  getAvailabilities(day: string) {
    return this.daysAvailability.get(day);
  }

  restoreCartEvents() {
    /* we restore events from cart */
    // if (!this.monoCart || !this.monoCart.cart_items || this.monoCart.cart_items.length <= 0) {
    //   return;
    // }
    // this.sessions = new Map();
    // for (const i in this.monoCart.cart_items) {
    //   if (this.monoCart.cart_items[ i ]) {
    //     const session = this.monoCart.cart_items[ i ].session;
    //     if (!session) {
    //       continue;
    //     }
    //     const mmtStart = moment(session.start_date + session.start_time, 'YYYY-MM-DDHH:mm');
    //     this.sessions.set(mmtStart.format('YYYY-MM-DDHH:mm'), session);
    //     this.addSession(session);
    //   }
    // }
  }

  /************************************************
   ***************** Display functions *************
   *************************************************/
  // isSlotBusy(dateTime: string) {
  //   return this.busySlots && this.busySlots.has(dateTime);
  // }
  //
  // isSlotEarly(dateTime: string) {
  //   return (this.earlySlots && this.earlySlots.has(dateTime))
  //     || (this.pauseSlots && this.pauseSlots.has(dateTime));
  // }
  //
  // isSlotInSession(dateTime: string) {
  //   return this.sessionsSlots && this.sessionsSlots.has(dateTime);
  // }
  //
  // isSlotSessionStart(dateTime: string) {
  //   return this.sessions && this.sessions.has(dateTime);
  // }
  //
  // isSlotSessionEnd(dateTime: string) {
  //   return this.sessionsEndSlots && this.sessionsEndSlots.has(dateTime);
  // }
  //
  // slotSessionTitle(dateTime: string) {
  //   if (this.sessions && this.sessions.has(dateTime)) {
  //     const session = this.sessions.get(dateTime);
  //     return session.start_time + ' - ' + session.end_time;
  //   }
  //   return undefined;
  // }
  //
  // slotSessionTooltip(dateTime: string) {
  //   if (this.sessions && this.sessions.has(dateTime)) {
  //     const session = this.sessions.get(dateTime);
  //     if (session.details.sport && session.details.city) {
  //       return session.details.sport[ 'trans' ][ this.locale ] + '-' + session.details.city.name;
  //     }
  //   }
  //   return '';
  // }
  //
  // isDayBusy(day: string): boolean {
  //   return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
  //     && this.daysBusySlotNumber.has(day) && this.daysAvailabilitySlotNumber.has(day)
  //     && this.daysBusySlotNumber.get(day) >= this.daysAvailabilitySlotNumber.get(day);
  // }

  /************************************************
   ***************** Events functions **************
   *************************************************/

  // addSession(session: Session) {
  //   const mmtStart = moment(session.start_date + session.start_time, 'YYYY-MM-DDHH:mm');
  //   const mmtEnd = moment(session.end_date + session.end_time, 'YYYY-MM-DDHH:mm');
  //   let timeRange = mmtStart.twix(mmtEnd).iterateInner(this.slotDuration, 'minutes');
  //   while (timeRange.hasNext()) {
  //     const time = timeRange.next();
  //     this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
  //     if (!timeRange.hasNext()) {
  //       this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
  //     }
  //   }
  //   /* building earliest slot before event */
  //   const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
  //   mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
  //   timeRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
  //   while (timeRange.hasNext()) {
  //     const time = timeRange.next();
  //     if (time.minutes() % this.slotDuration !== 0) {
  //       time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
  //     }
  //     if (time.isSameOrAfter(mmtEarlyStart) && time.isBefore(mmtStart)) {
  //       this.earlySlots.add(time.format('YYYY-MM-DDHH:mm'));
  //     }
  //   }
  //   /* building pause slots after event */
  //   const mmtEarlyEnd = mmtEnd.clone();
  //   mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
  //   const mmtPauseEnd = mmtEarlyEnd.clone().add(this.onlineSession.session_type.pause, 'minutes');
  //   timeRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
  //   while (timeRange.hasNext()) {
  //     const time = timeRange.next();
  //     if (time.minutes() % this.slotDuration !== 0) {
  //       time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
  //     }
  //     if (time.isSameOrAfter(mmtEarlyEnd) && time.isBefore(mmtPauseEnd)) {
  //       this.pauseSlots.add(time.format('YYYY-MM-DDHH:mm'));
  //     }
  //   }
  // }
  //
  // removeSession(session: Session) {
  //   const mmtStart = moment(session.start_date + session.start_time, 'YYYY-MM-DDHH:mm');
  //   const mmtEnd = moment(session.end_date + session.end_time, 'YYYY-MM-DDHH:mm');
  //   let timeRange = mmtStart.twix(mmtEnd).iterate(this.slotDuration, 'minutes');
  //   while (timeRange.hasNext()) {
  //     const time = timeRange.next();
  //     this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
  //     if (!timeRange.hasNext()) {
  //       this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
  //     }
  //   }
  //   /* removing early slots */
  //   const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
  //   mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
  //   timeRange = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
  //   while (timeRange.hasNext()) {
  //     const time = timeRange.next();
  //     if (time.minutes() % this.slotDuration !== 0) {
  //       time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
  //     }
  //     if (time.isSameOrAfter(mmtEarlyStart) && time.isBefore(mmtStart)) {
  //       this.earlySlots.delete(time.format('YYYY-MM-DDHH:mm'));
  //     }
  //   }
  //   /* removing pause slots */
  //   if (session.pause) {
  //     const mmtEarlyEnd = mmtEnd.clone();
  //     mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
  //     const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
  //     timeRange = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
  //     while (timeRange.hasNext()) {
  //       const time = timeRange.next();
  //       if (time.minutes() % this.slotDuration !== 0) {
  //         time.minutes(time.minutes() - (time.minutes() % this.slotDuration));
  //       }
  //       if (time.isSameOrAfter(mmtEarlyEnd) && time.isBefore(mmtPauseEnd)) {
  //         this.pauseSlots.delete(time.format('YYYY-MM-DDHH:mm'));
  //       }
  //     }
  //   }
  // }
  //
  // timeSlotClicked(dateTime: string) {
  //   if (this.isSlotBusy(dateTime) || this.isSlotEarly(dateTime)) {
  //     console.error('cheater');
  //     return;
  //   }
  //   if (!this.isSlotSessionStart(dateTime) && !this.isSlotInSession(dateTime)) {
  //     const mmtStart = moment(dateTime, 'YYYY-MM-DDHH:mm');
  //     const mmtEnd = mmtStart.clone().add(this.onlineSession.session_type.duration, 'minutes');
  //     const session = {
  //       start_date: mmtStart.format('YYYY-MM-DD'),
  //       end_date: mmtEnd.format('YYYY-MM-DD'),
  //       start_time: mmtStart.format('HH:mm'),
  //       end_time: mmtEnd.format('HH:mm'),
  //       pause: this.onlineSession.session_type.pause,
  //       details: {
  //         event_type: EventType.session,
  //         nb_persons: 1,
  //         age: null,
  //         sport: this.sportTeached && this.sportTeached[ 'sport' ] ? this.sportTeached[ 'sport' ] : null,
  //         city: this.cityTeached && this.cityTeached[ 'city' ] ? this.cityTeached[ 'city' ] : null,
  //         level: null,
  //         meeting_point: null
  //       }
  //     };
  //     this.sessions.set(mmtStart.format('YYYY-MM-DDHH:mm'), session);
  //     // this.cartService.emitAddSession({mono: this.mono, item: session} as CartMonoItem);
  //     this.addSession(session);
  //     this.onSessionCreated.emit(session);
  //   } else if (this.sessions.has(dateTime)) {
  //     const session = this.sessions.get(dateTime);
  //     this.sessions.delete(dateTime);
  //     this.cartService.emitDeleteSession({mono: this.mono, item: session} as CartMonoItem);
  //     this.removeSession(session);
  //   }
  // }
}
