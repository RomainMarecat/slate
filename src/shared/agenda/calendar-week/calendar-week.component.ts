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
import { Event } from '../shared/event';
import * as moment from 'moment';
import { Twix, TwixIter } from 'twix';
import 'twix';
import { Moment } from 'moment';
import { EventService } from '../shared/event.service';
import { Day } from '../shared/day';
import { Filter } from '../../facet/filter/shared/filter';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: [ './calendar-week.component.scss' ]
})
export class CalendarWeekComponent implements OnInit, OnChanges {
  // Default View Mode of Week Component
  viewMode: String = 'week';

  @Input() onlineSession: OnlineSession;
  @Input() start: Moment = moment();
  @Input() end: Moment = moment();
  @Input() slotDuration = 15;

  calendarStart: Moment;
  calendarEnd: Moment;
  @Output() viewModeChanged: EventEmitter<String> = new EventEmitter<String>();
  @Output() sessionCreated: EventEmitter<Session> = new EventEmitter<Session>();

  @Output() sessionRemoved: EventEmitter<Session> = new EventEmitter<Session>();

  @ViewChildren('dayList') el: ElementRef;
  days: Array<Day> = [];

  trueDuration: number;
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

  constructor(private eventService: EventService,
              private cd: ChangeDetectorRef,
              private rd: Renderer2) {
  }

  ngOnInit() {
    this.setCalendarWeek();
    this.setViewMode();
    this.setDateRange();
  }

  /**
   * Inspect all changes
   */
  ngOnChanges() {
    this.setDateRange();
  }

  /**
   * Set Default variables
   */
  setCalendarWeek() {
    this.onlineSession = {
      key: 'test1',
      session_type: {
        name: 'test1',
        max_persons: 1,
        booking_delay: 1,
        duration: 60,
        pause: 0,
      },
      prices: [ 10, 20 ],
      date_range: {
        start: '2018-01-01',
        end: '2019-12-31',
      },
      time_range: {
        start: '08:00',
        end: '19:00',
      }
    };
    this.sessionsSlots = new Set();
    this.sessionsEndSlots = new Set();
    this.earlySlots = new Set();
    this.pauseSlots = new Set();
    this.sessions = new Map();
  }

  /**
   * Set View Mode with week, day, 3 days
   * Init start, end,
   *
   */
  setViewMode() {
    // Init first day week number
    const firstDay = 0;
    // If empty start date then start to today
    if (!this.start) {
      this.start = moment();
    }
    this.start = moment(this.start).day(firstDay);
    this.end = moment(this.start).add(6, 'days');

    this.calendarStart = moment(this.start).startOf('day');
    this.calendarEnd = moment(this.end).endOf('day');
  }

  /**
   * On start/viewMode changed, do a recalculate of init start, end
   * days, daysAvailability and viewMode
   */
  setDateRange() {
    this.setCalendarWeek();
    this.setViewMode();
    // this.buildTrueDuration();
    this.loadEvents(this.start, this.end);
    this.daysAvailability = new Map();
    const dateRange: TwixIter = this.start
      .twix(this.end)
      .iterate(1, 'days');
    this.days = [];
    // Loading all days
    while (dateRange.hasNext()) {
      const date: Twix = dateRange.next();
      this.days.push({
        title: date.format('DD/MM/YYYY'),
        key: date.format('YYYY-MM-DD'),
        value: moment(date.toDate())
      });
      this.daysAvailability.set(date.format('YYYY-MM-DD'), []);
    }
    this.loadAvailabilities();
  }

  onSwithedView(viewMode: String) {
    this.viewModeChanged.emit(viewMode);
    this.setDateRange();
  }

  onStartChanged(start: Moment) {
    this.start = start;
    this.setDateRange();
  }

  onSessionAdded(session: Session) {
    this.sessions.set(moment(session.start).format('YYYY-MM-DDHH:mm'), session);
    this.addSession(session);
    this.sessionCreated.emit(session);
  }

  onSessionRemoved(source: { key: string, session: Session }) {
    this.sessions.delete(source.key);
    this.removeSession(source.session);
    this.sessionRemoved.emit(source.session);
    // this.setDateRange();
  }

  loadAvailabilities() {
    if (!this.daysAvailability || !this.onlineSession) {
      return;
    }

    console.log('loadAvailabilities:debug');
    const duration = this.onlineSession.session_type.duration;
    const onlineSessionStart: Moment = moment(this.onlineSession.date_range.start, 'YYYY-MM-DD').startOf('day');
    const onlineSessionEnd: Moment = moment(this.onlineSession.date_range.end, 'YYYY-MM-DD').endOf('day');
    this.daysAvailabilitySlotNumber = new Map();
    this.daysAvailability.forEach((avbs, day) => {
      let slotsNumber = 0;
      const mmtDay = moment(day, 'YYYY-MM-DD').hour(8);
      const mmtDayStartTime = moment(day + this.onlineSession.time_range.start, 'YYYY-MMDDHH:mm');
      /* days before this morning */
      console.log(
        'day before today morning 00:00',
        mmtDayStartTime.format('YYYY-MM-DDHH:mm'),
        moment().startOf('day').format('YYYY-MM-DDHH:mm'),
        mmtDayStartTime.isBefore(moment().startOf('day'))
      );
      if (mmtDayStartTime.isBefore(moment().startOf('day'))) {
        return;
      }
      /* booking delay */
      const minMmtStartTime = moment().add(this.onlineSession.session_type.booking_delay, 'hours');
      const mmtDayEndTime = moment(day + this.onlineSession.time_range.end, 'YYYY-MM-DDHH:mm');
      mmtDayEndTime.subtract(duration, 'minutes');

      const timeRange: TwixIter = mmtDayStartTime.twix(mmtDayEndTime).iterate(this.slotDuration, 'minutes');

      console.log(
        'mmtDayStartTime', mmtDayStartTime.format('HH:mm'),
        'mmtDayEndTime', mmtDayEndTime.format('HH:mm'),
        'calendarStart', this.calendarStart.toDate(),
        'calendarEnd', this.calendarEnd.toDate(),
        'mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)',
        mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)
      );
      if (this.calendarStart && this.calendarEnd && mmtDay.isBetween(onlineSessionStart, onlineSessionEnd)) {
        while (timeRange.hasNext()) {
          const time: Twix = timeRange.next();
          const timeMmt: Moment = moment(time.toDate());
          if (!timeMmt.isBefore(minMmtStartTime)) {
            avbs.push(time.format('HH:mm'));
            slotsNumber++;
          }
        }
      }
      this.daysAvailabilitySlotNumber.set(day, slotsNumber);
    });
  }

  /**
   * @param session
   */
  addSession(session: Session) {
    const mmtStart = moment(session.start);
    const mmtEnd = moment(session.end);
    const timeInnerRange: TwixIter = mmtStart.twix(mmtEnd).iterateInner(this.slotDuration, 'minutes');
    while (timeInnerRange.hasNext()) {
      const time: Twix = timeInnerRange.next();
      this.sessionsSlots.add(time.format('YYYY-MM-DDHH:mm'));
      if (!timeInnerRange.hasNext()) {
        this.sessionsEndSlots.add(time.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* building earliest slot before event */
    const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
    mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
    const timeEarlierRange: TwixIter = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
    while (timeEarlierRange.hasNext()) {
      const time: Twix = timeEarlierRange.next();
      const mmtTime: Moment = moment(time.toDate());
      if (mmtTime.minutes() % this.slotDuration !== 0) {
        mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
      }
      if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
        this.earlySlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* building pause slots after event */
    const mmtEarlyEnd = mmtEnd.clone();
    mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
    const mmtPauseEnd = mmtEarlyEnd.clone().add(this.onlineSession.session_type.pause, 'minutes');
    const timePauseRange: TwixIter = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
    while (timePauseRange.hasNext()) {
      const time: Twix = timePauseRange.next();
      const mmtTime: Moment = moment(time.toDate());

      if (mmtTime.minutes() % this.slotDuration !== 0) {
        mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
      }
      if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
        this.pauseSlots.add(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
  }

  /**
   * @param session
   */
  removeSession(session: Session) {
    const mmtStart = moment(session.start);
    const mmtEnd = moment(session.end);
    const timeInnerRange: TwixIter = mmtStart.twix(mmtEnd).iterate(this.slotDuration, 'minutes');
    while (timeInnerRange.hasNext()) {
      const time: Twix = timeInnerRange.next();
      this.sessionsSlots.delete(time.format('YYYY-MM-DDHH:mm'));
      if (!timeInnerRange.hasNext()) {
        this.sessionsEndSlots.delete(time.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* removing early slots */
    const mmtEarlyStart = mmtStart.clone().subtract(this.trueDuration, 'minutes');
    mmtEarlyStart.minutes(mmtEarlyStart.minutes() - (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
    const timeEarlyRange: TwixIter = mmtEarlyStart.twix(mmtStart).iterate(this.slotDuration, 'minutes');
    while (timeEarlyRange.hasNext()) {
      const time: Twix = timeEarlyRange.next();
      const mmtTime: Moment = moment(time.toDate());

      if (mmtTime.minutes() % this.slotDuration !== 0) {
        mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
      }
      if (mmtTime.isSameOrAfter(mmtEarlyStart) && mmtTime.isBefore(mmtStart)) {
        this.earlySlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
      }
    }
    /* removing pause slots */
    if (session.pause) {
      const mmtEarlyEnd = mmtEnd.clone();
      mmtEarlyEnd.subtract(mmtEarlyEnd.minutes() % this.slotDuration);
      const mmtPauseEnd = mmtEarlyEnd.clone().add(session.pause, 'minutes');
      const timePauseRange: TwixIter = mmtEarlyEnd.twix(mmtPauseEnd).iterate(this.slotDuration, 'minutes');
      while (timePauseRange.hasNext()) {
        const time: Twix = timePauseRange.next();
        const mmtTime: Moment = moment(time.toDate());

        if (mmtTime.minutes() % this.slotDuration !== 0) {
          mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
        }
        if (mmtTime.isSameOrAfter(mmtEarlyEnd) && mmtTime.isBefore(mmtPauseEnd)) {
          this.pauseSlots.delete(mmtTime.format('YYYY-MM-DDHH:mm'));
        }
      }
    }
  }

  /************************************************
   ******************* Date functions **************
   *************************************************/

  // buildTrueDuration() {
  //   if (this.onlineSession && this.onlineSession.session_type
  //     && this.onlineSession.session_type.duration !== undefined
  //     && this.onlineSession.session_type.pause !== undefined) {
  //     this.trueDuration = this.onlineSession.session_type.duration + this.onlineSession.session_type.pause;
  //   } else {
  //     this.trueDuration = 0;
  //   }
  // }

  loadEvents(start: Moment, end: Moment) {
    this.eventService.filters$.next([
      {
        column: 'start',
        operator: '>=',
        value: moment(start).toDate().toDateString()
      }
    ] as Filter[]);
    this.eventService.getEvents()
      .subscribe((events: Event[]) => {
        this.events = [ ...events.filter((event) => event && event.end <= end.toDate()) ];
        this.busySlots = new Set();
        this.daysBusySlotNumber = new Map();

        this.events.forEach((event: Event) => {
          const mmtEventStart = moment(event.start, 'YYYY-MM-DDHH:mm');
          const mmtEventEnd = moment(event.end, 'YYYY-MM-DDHH:mm');
          if (!mmtEventStart || !mmtEventStart.isValid()
            || !mmtEventEnd || !mmtEventEnd.isValid()
            || !mmtEventStart.isBefore(mmtEventEnd)) {
            console.error('invalid dates');
            return -1;
          }
          /* building busy slots by events*/
          const eventsTimeRange: TwixIter = mmtEventStart.twix(mmtEventEnd).iterate(this.slotDuration, 'minutes');
          while (eventsTimeRange.hasNext()) {
            const time: Twix = eventsTimeRange.next();
            const mmtTime: Moment = moment(time.toDate());
            if (mmtTime.minutes() % this.slotDuration !== 0) {
              mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
            }
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
              && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
              && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
              let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
              dayBusyNumber++;
              this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));
          }
          /* building earliest slot before event */
          const mmtEarlyStart = mmtEventStart.clone().subtract(this.trueDuration, 'minutes');
          mmtEarlyStart.minutes(mmtEarlyStart.minutes() -
            (mmtEarlyStart.minutes() % this.slotDuration) + this.slotDuration);
          const earliestTimeRange: TwixIter = mmtEarlyStart.twix(mmtEventStart).iterate(this.slotDuration, 'minutes');
          while (earliestTimeRange.hasNext()) {
            const time: Twix = earliestTimeRange.next();
            const mmtTime: Moment = moment(time.toDate());

            if (mmtTime.minutes() % this.slotDuration !== 0) {
              mmtTime.minutes(mmtTime.minutes() - (mmtTime.minutes() % this.slotDuration));
            }
            /* IF the busy slot is in availability and not already in busySloits we count it */
            if (this.daysAvailability && this.daysAvailability.has(time.format('YYYY-MM-DD'))
              && !this.busySlots.has(time.format('YYYY-MM-DDHH:mm'))
              && this.daysAvailability.get(time.format('YYYY-MM-DD')).indexOf(time.format('HH:mm')) >= 0) {
              let dayBusyNumber = this.daysBusySlotNumber.has(time.format('YYYY-MM-DD')) ?
                this.daysBusySlotNumber.get(time.format('YYYY-MM-DD')) : 0;
              dayBusyNumber++;
              this.daysBusySlotNumber.set(time.format('YYYY-MM-DD'), dayBusyNumber);
            }
            this.busySlots.add(time.format('YYYY-MM-DDHH:mm'));

          }
        });

        this.cd.markForCheck();
        // this.restoreCartEvents();
      });
  }
}
