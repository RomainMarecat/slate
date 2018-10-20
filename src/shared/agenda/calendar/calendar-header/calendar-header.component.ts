import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {
  private _viewMode: String;
  @Input() start: Moment;
  @Input() end: Moment;
  @Output() switchedView: EventEmitter<String> = new EventEmitter<String>();
  @Output() startChanged: EventEmitter<Moment> = new EventEmitter<Moment>();

  ngOnInit() {
  }

  @Input() set viewMode(viewMode) {
    this.switchView(viewMode);
  }

  /**
   * Switch current view to another
   */
  switchView(viewMode: String) {
    this._viewMode = viewMode;
    this.onSwitchedView(viewMode);
  }

  /**
   * getter of private _viewMode
   */
  get viewMode(): String {
    return this._viewMode;
  }

  /**
   * Emitter of view
   */
  onSwitchedView(viewMode: String) {
    this.switchedView.emit(viewMode);
  }

  /**
   * Emitter of start date moment
   */
  onStartChanged(start: Moment) {
    this.startChanged.emit(start);
  }

  /**
   * return to now on start date
   */
  goToToday() {
    this.start = moment();
    this.onStartChanged(this.start);
  }

  /**
   * Check if start is equal to today
   */
  isToday() {
    return moment() === moment(this.start);
  }

  /**
   * Go to previous day
   */
  previousDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).subtract(daysNb, 'day');
    this.onStartChanged(this.start);
  }

  /**
   * Go to new day
   */
  nextDay() {
    let daysNb = 1;
    if (this.viewMode === 'week') {
      daysNb = 7;
    }
    this.start = moment(this.start).add(daysNb, 'day');
    this.onStartChanged(this.start);
  }
}
