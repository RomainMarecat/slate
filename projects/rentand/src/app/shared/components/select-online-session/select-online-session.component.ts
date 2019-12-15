import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { OnlineSession } from '../../interfaces/online-session';

import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-profil-agenda-calendar-select-online-session',
  templateUrl: './select-online-session.component.html',
  styleUrls: ['./select-online-session.component.scss']
})
export class SelectOnlineSessionComponent implements OnChanges {

  _onlineSessions: OnlineSession[];
  @Output() onlineSessionChange: EventEmitter<OnlineSession> = new EventEmitter<OnlineSession>();
  selectedOnlineSession: OnlineSession;

  prettyOnlineSession: any[];

  @Input() onlineSession: OnlineSession;

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

  ngOnChanges() {
    if (this._onlineSessions && this._onlineSessions.length > 0) {
      this.loadDurations();
    }
  }

  loadDurations() {
    this.prettyOnlineSession = [];
    this._onlineSessions
      .map((onlineSession: OnlineSession) => {
        const prettyName = onlineSession.session_type.name.concat(
          ' - ',
          moment
            .duration(
              onlineSession.session_type.duration,
              'minutes'
            ).humanize()
        );
        this.prettyOnlineSession.push({
          name: prettyName,
          onlineSession
        });
      });
    this.selectedOnlineSession = this._onlineSessions[0];
    this.onlineSessionChange.emit(this.selectedOnlineSession);
  }

  updateOnlineSession(event: MatSelectChange) {
    const onlineSession = event.value;
    this.onlineSessionChange.emit(onlineSession);
  }
}
