import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda/agenda.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { EventService } from './shared/event.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarHeaderComponent } from './calendar-week/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar-week/calendar-body/calendar-body.component';
import { AlertService } from '../popup/alert.service';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule,
    AgendaRoutingModule
  ],
  declarations: [
    AgendaComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent,
    CalendarWeekComponent
  ],
  exports: [
    AgendaComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent,
    CalendarWeekComponent
  ],
  providers: [
    EventService,
    AlertService
  ]
})
export class AgendaModule {
}
