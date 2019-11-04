import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Session } from '@romainmarecat/ngx-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { Subscription } from 'rxjs';
import { I18nService } from '../../i18n/i18n.service';
import { AlertService } from '../../popup/alert.service';
import { SeoService } from '../../seo/shared/seo.service';
import { User } from '../../user/shared/user';
import { UserService } from '../../user/shared/user.service';
import { RoutingState } from '../../util/routing-state';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'app-firebase-agenda',
  templateUrl: './firebase-agenda.component.html',
  styleUrls: ['./firebase-agenda.component.scss']
})
export class FirebaseAgendaComponent implements OnInit, OnDestroy {
  viewMode: string;
  slotDuration: number;
  watcher: Subscription;
  sessions: Session[] = [];
  user: User;
  @Input() onlineSession;

  constructor(private seoService: SeoService,
              private router: Router,
              private i18nService: I18nService,
              private media: MediaObserver,
              private sessionService: SessionService,
              private alertService: AlertService,
              private routingState: RoutingState,
              private userService: UserService) {
    if (this.router.url.includes('agenda')) {
      this.seoService.setSeo('agenda');
    }
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
        if (!user) {
          this.user = {
            uid: null,
            displayName: 'Anonyme',
            email: ''
          } as User;
        }
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
        return;
      }
      if (FirebaseAgendaComponent.betweenSmAndMd(change[0])) {
        this.setViewMode('three_days');
        return;
      }
    }
    this.setViewMode('week');
  }

  loadSessions(start: Moment) {
    this.sessionService.limit$.next(100);
    this.sessionService.filters$.next([
      {
        column: 'start',
        operator: '>=',
        value: start.toDate()
      }
    ]);

    // const sessionSubscription: Subscription = this.sessionService.getSessions()
    //  .subscribe((sessions: Session[]) => {
    //    this.sessions = sessions.map((session) => {
    //      session.start = moment((session.start as unknown as Timestamp).seconds * 1000).toDate();
    //      session.end = moment((session.end as unknown as Timestamp).seconds * 1000).toDate();
    //      return session;
    //    });
    //
    //    if (sessionSubscription) {
    //      sessionSubscription.unsubscribe();
    //    }
    //  });
  }

  setViewMode(viewMode: string) {
    this.viewMode = viewMode;
    this.loadSessions(moment());
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  setDefaultSlotDuration() {
    this.slotDuration = 60;
  }

  onViewModeChanged(viewMode: string) {
    this.viewMode = viewMode;
  }

  onSessionRemoved(session: Session) {
    this.sessionService.deleteSession(session)
      .then(() => {
      });
  }

  onSessionAdded(session: Session) {
    this.sessionService.createSession(session)
      .subscribe(() => {
      }, () => {
        this.alertService.show('session.error.save');
      });
  }
}
