import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { SelectCityTeachedModule } from '../select-city-teached/select-city-teached.module';
import { SelectMeetingPointModule } from '../select-meeting-point/select-meeting-point.module';
import { SelectNumberParticipantModule } from '../select-number-participant/select-number-participant.module';
import { SelectOnlineSessionModule } from '../select-online-session/select-online-session.module';
import { SelectSportTeachedModule } from '../select-sport-teached/select-sport-teached.module';
import { AgendaComponent } from './agenda.component';


@NgModule({
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    SelectNumberParticipantModule,
    SelectOnlineSessionModule,
    SelectSportTeachedModule,
    SelectCityTeachedModule,
    SelectMeetingPointModule,
    NgxCalendarModule
  ]
})
export class AgendaModule {
}
