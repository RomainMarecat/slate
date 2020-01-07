import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { OnlineSession } from '@romainmarecat/ngx-calendar';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-profil-agenda-calendar-select-duration',
  templateUrl: './select-duration.component.html',
  styleUrls: ['./select-duration.component.scss']
})
export class SelectDurationComponent {

  _onlineSessions: OnlineSession[];
  durations: Array<string> = [];
  @Output() durationChange: EventEmitter<string> = new EventEmitter<string>();
  selectedDuration: string;

  get onlineSessions(): OnlineSession[] {
    return this._onlineSessions;
  }

  @Input('onlineSessions')
  set onlineSessions(onlineSessions: OnlineSession[]) {
    this._onlineSessions = onlineSessions;
    if (this.onlineSessions !== null) {
      this.loadDurations();
    }
  }

  loadDurations() {
    if (this.durations && this.durations.length > 0) {
      this.durations = [];
    }
    this._onlineSessions
      .map((onlineSession: OnlineSession) => {
        this.durations.push(
          onlineSession.comment.concat(
            ' - ',
            moment
              .duration(
                onlineSession.duration,
                'minutes'
              ).humanize()
          )
        );
        this.durations
          .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);
        this.selectedDuration = this.durations[0];
      });
  }

  updateDuration(event: MatSelectChange) {
    const duration = event.value;
    this.durationChange.emit(duration);
  }

}
