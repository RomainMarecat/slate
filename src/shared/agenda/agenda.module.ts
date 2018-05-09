import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda/agenda.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { MatTooltipModule } from '@angular/material';
import { EventService } from './shared/event.service';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    AgendaRoutingModule
  ],
  declarations: [
    AgendaComponent,
    CalendarComponent,
    CalendarWeekComponent
  ],
  exports: [
    AgendaComponent,
    CalendarComponent,
    CalendarWeekComponent
  ],
  providers: [
    EventService
  ]
})
export class AgendaModule {
}
