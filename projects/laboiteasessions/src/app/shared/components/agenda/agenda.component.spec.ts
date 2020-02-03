import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { ToastModule } from '../../../layout/toast/toast.module';
import { AuthenticationService } from '../../services/authentication.service';
import { OnlineSessionService } from '../../services/online-session.service';
import { SportTeachedService } from '../../services/sport-teached.service';
import { initialAppState } from '../../store/app.state';
import { MockStoreModule } from '../../store/mock/mock-store.module';
import { SelectCityTeachedModule } from '../select-city-teached/select-city-teached.module';
import { SelectMeetingPointModule } from '../select-meeting-point/select-meeting-point.module';
import { SelectNumberParticipantModule } from '../select-number-participant/select-number-participant.module';
import { SelectOnlineSessionModule } from '../select-online-session/select-online-session.module';
import { SelectSportTeachedModule } from '../select-sport-teached/select-sport-teached.module';

import { AgendaComponent } from './agenda.component';

describe('AgendaComponent', () => {
  let component: AgendaComponent;
  let fixture: ComponentFixture<AgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaComponent],
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        ToastModule,
        SelectOnlineSessionModule,
        SelectNumberParticipantModule,
        SelectSportTeachedModule,
        SelectCityTeachedModule,
        SelectMeetingPointModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxCalendarModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MockStoreModule.forRoot('app', initialAppState),
      ],
      providers: [
        OnlineSessionService,
        SportTeachedService,
        AuthenticationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
