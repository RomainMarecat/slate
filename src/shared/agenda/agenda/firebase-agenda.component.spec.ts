import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { MockUserService } from '../../user/shared/mock-user.service';
import { UserService } from '../../user/shared/user.service';
import { MockEventService } from '../shared/mock-event.service';
import { MockSessionService } from '../shared/mock-session.service';
import { SessionService } from '../shared/session.service';

import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventService } from '../shared/event.service';
import { I18nService } from '../../i18n/i18n.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockAlertService } from '../../popup/mock-alert.service';
import { AlertService } from '../../popup/alert.service';
import { RoutingState } from '../../util/routing-state';
import { LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { SeoModule } from '../../seo/seo.module';
import { FirebaseAgendaComponent } from './firebase-agenda.component';

describe('FirebaseAgendaComponent', () => {
  let component: FirebaseAgendaComponent;
  let fixture: ComponentFixture<FirebaseAgendaComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        SeoModule,
        NgxCalendarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [
        FirebaseAgendaComponent,
      ],
      providers: [
        RoutingState,
        {provide: EventService, useClass: MockEventService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: UserService, useClass: MockUserService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        I18nService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
