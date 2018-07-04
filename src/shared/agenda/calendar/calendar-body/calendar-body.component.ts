import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from '../../shared/day';
import { Session } from '../../../session/shared/session';
import { EventType } from '../../shared/event';
import * as moment from 'moment';
import { OnlineSession } from '../../shared/online-session';
import { Moment } from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {
  @Input() onlineSession: OnlineSession;
  @Input() viewMode: String;
  @Input() start: Moment;
  @Input() end: Moment;
  @Input() days: Array<Day>;

  @Input() daysAvailability: Map<string, string[]>;
  @Input() daysBusySlotNumber: Map<string, number>;
  @Input() daysAvailabilitySlotNumber: Map<string, number>;
  @Input() busySlots: Set<string>;
  @Input() earlySlots: Set<string>;
  @Input() pauseSlots: Set<string>;
  @Input() sessionsSlots: Set<string>;
  @Input() sessionsEndSlots: Set<string>;
  @Input() sessions: Map<string, Session>;

  @Output() sessionAdded: EventEmitter<Session> = new EventEmitter<Session>();
  @Output() sessionRemoved: EventEmitter<{key: string, session: Session}>
    = new EventEmitter<{key: string, session: Session}>();
  @Output() startChanged: EventEmitter<Moment> = new EventEmitter<Moment>();
  @Output() endChanged: EventEmitter<Moment> = new EventEmitter<Moment>();

  /**
   *
   * @param {TranslateService} translate
   * @param {AlertService} alertService
   */
  constructor(private translate: TranslateService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  /**
   * On click next day button, trigger switch start
   */
  onNextDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).add(daysNb, 'day');
    this.startChanged.emit(this.start);
  }

  /**
   * If all slot is not avalaibles all all days
   * @returns {boolean}
   */
  isAllSlotNotAvailable(): boolean {
    if (this.days && this.days.length > 0) {
      return this.days.filter((day) => this.daysAvailability.get(day.key).length > 0).length === 0;
    }
  }

  /**
   * All Availabilities by key: string, title: string, value: Moment
   * @param day
   * @returns {undefined|String[]}
   */
  getAvailabilities(day: string): String[] {
    return this.daysAvailability.get(day);
  }

  /**
   *
   * @param day
   * @param time
   * @returns string
   */
  getSessionTitle(day: Day, time: string): string {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    if (this.sessions && this.sessions.has(datetime)) {
      const session: Session = this.sessions.get(datetime);
      return moment(session.start).format('HH:mm') + ' - ' + moment(session.end).format('HH:mm');
    }
    return '';
  }

  /**
   *
   * @param day
   * @param time
   * @returns string
   */
  getSessionTooltip(day: Day, time: string): string {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;
    if (this.sessions && this.sessions.has(datetime)) {
      const session = this.sessions.get(datetime);
      if (session.details.info) {
        return this.translate.instant(session.details.info);
      }
    }

    return '';
  }

  /**
   * @param day
   * @param time
   */
  onTimeSlotClicked(day: Day, time: string) {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    if (this.isSlotBusy(day, time) || this.isSlotEarly(day, time)) {
      this.alertService.show('error.slot.locked');
      return;
    }

    if (!this.isSlotSessionStart(day, time) && !this.isSlotInSession(day, time)) {
      const mmtStart = moment(datetime, 'YYYY-MM-DDHH:mm');
      const mmtEnd = mmtStart.clone().add(this.onlineSession.session_type.duration, 'minutes');
      this.addSession(mmtStart, mmtEnd);
    } else if (this.sessions.has(datetime)) {
      const session = this.sessions.get(datetime);
      const source = {key: datetime, session: session};
      this.removeSession(source);
    }
  }

  /**
   * @param start
   * @param end
   */
  addSession(start: Moment, end: Moment) {
    const session: Session = {
      start: start.toDate(),
      end: end.toDate(),
      pause: this.onlineSession.session_type.pause,
      details: {
        nb_persons: 1,
        event_type: EventType.session,
        info: 'calendar.session.info',
      }
    };
    this.sessionAdded.emit(session);
  }

  /**
   * @param source
   */
  removeSession(source: {key: string, session: Session}) {
    this.sessionRemoved.emit(source);
  }

  /**
   * If day is busy (occupé) by current key string
   * @param day
   * @param time
   * @returns {Map<string, number>|boolean}
   */
  isDayBusy(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.daysBusySlotNumber && this.daysAvailabilitySlotNumber
      && this.daysBusySlotNumber.has(datetime) && this.daysAvailabilitySlotNumber.has(datetime)
      && this.daysBusySlotNumber.get(datetime) >= this.daysAvailabilitySlotNumber.get(datetime);
  }

  /**
   * If slot is busy by date
   * @returns {any}
   * @param day
   * @param time
   */
  isSlotBusy(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.busySlots && this.busySlots.has(datetime);
  }

  /**
   * if slot is on previous (date plus tôt)
   * @returns boolean
   * @param day
   * @param time
   */
  isSlotEarly(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return (this.earlySlots && this.earlySlots.has(datetime))
      || (this.pauseSlots && this.pauseSlots.has(datetime));
  }

  /**
   * is Slot in current activities
   * @returns {Set<string>|boolean}
   * @param day
   * @param time
   */
  isSlotInSession(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessionsSlots && this.sessionsSlots.has(datetime);
  }

  /**
   * @param day
   * @param time
   * @returns {Map<string, Session>|boolean}
   */
  isSlotSessionStart(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessions && this.sessions.has(datetime);
  }

  /**
   * @param day
   * @param time
   * @returns {Set<string>|boolean}
   */
  isSlotSessionEnd(day: Day, time: string): boolean {
    const datetime: string = day.value.format('YYYY-MM-DD') + time;

    return this.sessionsEndSlots && this.sessionsEndSlots.has(datetime);
  }
}
