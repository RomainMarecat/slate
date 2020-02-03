import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { LoginModule } from '../../../pages/security/login/login.module';
import { SelectCityTeachedModule } from '../select-city-teached/select-city-teached.module';
import { SelectMeetingPointModule } from '../select-meeting-point/select-meeting-point.module';
import { SelectNumberParticipantModule } from '../select-number-participant/select-number-participant.module';
import { SelectOnlineSessionModule } from '../select-online-session/select-online-session.module';
import { SelectSportTeachedModule } from '../select-sport-teached/select-sport-teached.module';
import { AgendaComponent } from './agenda.component';
import { SessionSummaryModule } from '../session/session-summary/session-summary.module';


@NgModule({
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
  imports: [
    CommonModule,
    LoginModule,
    SelectNumberParticipantModule,
    SelectOnlineSessionModule,
    SelectSportTeachedModule,
    SelectCityTeachedModule,
    SelectMeetingPointModule,
    SessionSummaryModule,
    NgxCalendarModule
  ]
})
export class AgendaModule {
}
