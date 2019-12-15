import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { OnlineSession } from '../../interfaces/online-session';

@Component({
  selector: 'app-profil-agenda-calendar-select-number-participant',
  templateUrl: './select-number-participant.component.html',
  styleUrls: ['./select-number-participant.component.scss']
})
export class SelectNumberParticipantComponent {

  _onlineSession: OnlineSession;
  numberParticipants: Array<string> = [];
  @Output() numberParticipantChange: EventEmitter<number> = new EventEmitter<number>();
  selectedNumberParticipant: string;

  get onlineSession(): OnlineSession {
    return this._onlineSession;
  }

  @Input('onlineSession')
  set onlineSession(onlineSession: OnlineSession) {
    this._onlineSession = onlineSession;
    if (this.onlineSession !== null) {
      this.loadNumberParticipant();
    }
  }

  loadNumberParticipant() {
    if (!this._onlineSession || !this._onlineSession.session_type) {
      return;
    }
    this.numberParticipants = [];
    for (let i = 1; i <= this._onlineSession.session_type.max_persons; i++) {
      if (this.numberParticipants.indexOf(i.toString()) < 0) {
        this.numberParticipants.push(i.toString());
      }
    }
    this.selectedNumberParticipant = this.numberParticipants[0];
  }

  updateNumberParticipant(event: MatSelectChange) {
    this.numberParticipantChange.emit(event.value);
  }
}


