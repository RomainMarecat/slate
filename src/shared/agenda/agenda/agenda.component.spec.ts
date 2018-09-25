import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponent } from './agenda.component';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarComponent } from '../calendar/calendar.component';
import { MockEventService } from '../shared/mock-event.service';
import { EventService } from '../shared/event.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CalendarHeaderComponent } from '../calendar/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from '../calendar/calendar-body/calendar-body.component';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { SessionService } from '../../session/shared/session.service';
import { MockSessionService } from '../../session/shared/mock-session.service';
import { RoutingState } from '../../util/routing-state';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        AgendaComponent,
        CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent
      ],
      providers: [
        RoutingState,
        {provide: EventService, useClass: MockEventService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        I18nService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
