import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MockEventService } from '../shared/mock-event.service';
import { EventService } from '../shared/event.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-body/calendar-body.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { SessionService } from '../../session/shared/session.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockSessionService } from '../../session/shared/mock-session.service';
import { mockEnd, mockStart } from '../shared/mock-day';
import { mockOnlineSession } from '../shared/mock-online-session';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

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
        CalendarComponent,
        CalendarHeaderComponent,
        CalendarBodyComponent
      ],
      providers: [
        {provide: EventService, useClass: MockEventService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.viewMode = 'week';
    expect(component).toBeTruthy();
  });

  it('should create with param', () => {

    component.viewMode = 'week';
    component.start = mockStart;
    component.end = mockEnd;
    component.onlineSession = mockOnlineSession;

    expect(component).toBeTruthy();
  });
});
