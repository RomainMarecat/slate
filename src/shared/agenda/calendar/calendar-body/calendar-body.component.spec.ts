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

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;

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
      declarations: [ CalendarBodyComponent ],
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
});
