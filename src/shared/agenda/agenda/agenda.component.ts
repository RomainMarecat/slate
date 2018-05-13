import { Component, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import * as moment from 'moment';
import { Session } from '../../session/shared/session';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { SessionService } from '../../session/shared/session.service';
import { AlertService } from '../../popup/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: [ './agenda.component.scss' ]
})
export class AgendaComponent implements OnInit, OnDestroy {
  viewMode: String;
  slotDuration: number;
  watcher: Subscription;

  constructor(private router: Router,
              private i18nService: I18nService,
              private media: ObservableMedia,
              private sessionService: SessionService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    let locale: string = this.i18nService.locale;

    if (locale === 'en') {
      locale = 'en-gb';
    }

    moment().locale(locale);
    this.setDefaultSlotDuration();
    this.watcher = this.media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.setViewMode('day');
        return;
      } else if (change.mqAlias === 'sm' || change.mqAlias === 'md') {
        this.setViewMode('3days');
        return;
      }
      this.setViewMode('week');
    });
  }

  setViewMode(viewMode: String) {
    this.viewMode = viewMode;
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
  }

  onSessionAdded(session: Session) {
    this.sessionService.createSession(session)
      .then((doc) => {
        if (doc.id) {
          this.router.navigate([ '/booking' ]);
        }
      }, (err) => {
        console.error(err);
        this.alertService.show(err, 'error');
      });
  }
}
