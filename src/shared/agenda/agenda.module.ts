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
