import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBodyComponent } from './calendar-body.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EventService } from '../../shared/event.service';
import { MockEventService } from '../../shared/mock-event.service';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { mockAvailabilities, mockDays, mockEnd, mockStart } from '../../shared/mock-day';
import { mockOnlineSession } from '../../shared/mock-online-session';

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTooltipModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [CalendarBodyComponent],
      providers: [
        {provide: EventService, useClass: MockEventService},
        {provide: AlertService, useClass: MockAlertService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.viewMode = 'week';
    component.days = mockDays;
    component.daysAvailability = mockAvailabilities;
    component.end = mockEnd;
    component.start = mockStart;
    component.onlineSession = mockOnlineSession;
    expect(component).toBeTruthy();
  });

});
