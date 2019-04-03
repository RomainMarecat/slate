import { Component, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from '../../i18n/i18n.service';
import * as moment from 'moment';
import { Session } from '../../session/shared/session';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { SessionService } from '../../session/shared/session.service';
import { AlertService } from '../../popup/alert.service';
import { Router } from '@angular/router';
import { RoutingState } from '../../util/routing-state';
import { LocalizeRouterService } from 'localize-router';
import { SeoService } from '../../seo/shared/seo.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit, OnDestroy {
  viewMode: String;
  slotDuration: number;
  watcher: Subscription;

  constructor(private seoService: SeoService,
              private router: Router,
              private i18nService: I18nService,
              private media: MediaObserver,
              private sessionService: SessionService,
              private alertService: AlertService,
              private routingState: RoutingState,
              private localizeRouterService: LocalizeRouterService) {
    this.seoService.setSeo('agenda');
  }

  ngOnInit() {
    this.routingState.loadRouting();
    let locale: string = this.i18nService.locale;

    if (locale === 'en') {
      locale = 'en-gb';
    }

    moment().locale(locale);
    this.setDefaultSlotDuration();
    this.watcher = this.media.asObservable().subscribe((change: MediaChange[]) => {
      if (change.length && change[0].mqAlias === 'xs') {
        this.setViewMode('day');
        return;
      } else if (change.length && (change[0].mqAlias === 'sm' || change[0].mqAlias === 'md')) {
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
          session.key = doc.id;
          this.sessionService.updateSession(session)
            .then(() => doc.id,
              (err) => {
                console.error(err);
                this.alertService.show(err, 'error');
              });
        }
        this.router.navigate([this.localizeRouterService.translateRoute('/cart')]);
      }, (err) => {
        this.alertService.show(err, 'error');
      })
      .catch((err) => {
        this.alertService.show(err, 'error');
        this.router.navigate([this.localizeRouterService.translateRoute('/cart')]);
      });
  }
}
