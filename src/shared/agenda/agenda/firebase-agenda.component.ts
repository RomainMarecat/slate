import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { User } from '@firebase/auth-types';
import { UserService } from '../../user/shared/user.service';
import { SessionService } from '../shared/session.service';
import { Session } from '@romainmarecat/ngx-calendar';
import { Moment } from 'moment';
import { I18nService } from '../../i18n/i18n.service';
import * as moment from 'moment';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { AlertService } from '../../popup/alert.service';
import { Router } from '@angular/router';
import { RoutingState } from '../../util/routing-state';
import { SeoService } from '../../seo/shared/seo.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-firebase-agenda',
  templateUrl: './firebase-agenda.component.html',
  styleUrls: ['./firebase-agenda.component.scss']
})
export class FirebaseAgendaComponent implements OnInit, OnDestroy {
  viewMode: String;
  slotDuration: number;
  watcher: Subscription;
  sessions: Session[] = [];
  user: User;

  constructor(private seoService: SeoService,
              private router: Router,
              private i18nService: I18nService,
              private media: MediaObserver,
              private sessionService: SessionService,
              private alertService: AlertService,
              private routingState: RoutingState,
              private userService: UserService) {
    this.seoService.setSeo('agenda');
  }

  static betweenSmAndMd(change: MediaChange): boolean {
    return change.mqAlias === 'sm' || change.mqAlias === 'md';
  }

  ngOnInit() {
    this.routingState.loadRouting();
    this.changeMomentLocale();
    this.setDefaultSlotDuration();
    this.getUser();
  }

  getUser() {
    this.userService.getAuthStateUser()
      .subscribe((user) => {
        this.user = user;
        this.changeViewModeByMediaQuery();
      });
  }

  changeMomentLocale() {
    let locale: string = this.i18nService.locale;

    if (locale === 'en') {
      locale = 'en-gb';
    }

    moment().locale(locale);
  }

  changeViewModeByMediaQuery() {
    this.watcher = this.media.asObservable()
      .subscribe((change: MediaChange[]) => {
        this.changeViewMode(change);
      });
  }

  changeViewMode(change: MediaChange[]) {
    if (change.length) {
      if (change[0].mqAlias === 'xs') {
        this.setViewMode('day');
      }
      if (FirebaseAgendaComponent.betweenSmAndMd(change[0])) {
        this.setViewMode('three_days');
      }

      return;
    }
    this.setViewMode('week');
  }

  loadSessions(start: Moment) {
    this.sessionService.filters$.next([
      {
        column: 'start',
        operator: '>=',
        value: start.toDate()
      }
    ]);

    const sessionSubscription: Subscription = this.sessionService.getSessions()
      .subscribe((sessions: Session[]) => {
        this.sessions = sessions.map((session) => {
          session.start = moment((session.start as unknown as Timestamp).seconds * 1000).toDate();
          session.end = moment((session.end as unknown as Timestamp).seconds * 1000).toDate();
          return session;
        });
        if (sessionSubscription) {
          sessionSubscription.unsubscribe();
        }
      });
  }

  setViewMode(viewMode: String) {
    this.viewMode = viewMode;
    this.loadSessions(moment());
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  setDefaultSlotDuration() {
    this.slotDuration = 60;
  }

  onViewModeChanged(viewMode: String) {
    this.viewMode = viewMode;
  }

  onSessionRemoved(session: Session) {
    this.sessionService.deleteSession(session)
      .then(() => {
      });
  }

  onSessionAdded(session: Session) {
    this.sessionService.createSession(session)
      .subscribe((doc: DocumentReference) => {
      }, (err) => {
        this.alertService.show(err, 'session.error.save');
      });
  }
}
