import { Component, OnInit } from '@angular/core';
import { Session } from '@romainmarecat/ngx-calendar';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
  selector: 'app-simple-agenda',
  templateUrl: './simple-agenda.component.html',
  styleUrls: ['./simple-agenda.component.scss']
})
export class SimpleAgendaComponent implements OnInit {

  sessions: Session[];

  user: {
    uid: string;
    displayName: string;
    email: string;
  };

  constructor() {
  }

  ngOnInit() {
    this.getSessions();
    this.getUser();
  }

  getUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      return;
    }

    this.user = {
      uid: Math.random().toString(10),
      displayName: 'test',
      email: 'test@calendar.com'
    };

    localStorage.setItem('user', JSON.stringify(this.user));
  }

  onSessionCreated(session: Session) {
    this.sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(this.sessions));
  }

  getSessions() {
    this.sessions = localStorage.getItem('sessions') !== null ? JSON.parse(localStorage.getItem('sessions')) : [];
  }
}
