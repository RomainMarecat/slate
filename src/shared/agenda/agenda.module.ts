import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda/agenda.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { EventService } from './shared/event.service';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './calendar/calendar-body/calendar-body.component';
import { AlertService } from '../popup/alert.service';
import { SessionModule } from '../session/session.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    AgendaRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    SessionModule,
    TranslateModule
  ],
  declarations: [
    AgendaComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent,
  ],
  exports: [
    AgendaComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarBodyComponent,
  ],
  providers: [
    EventService,
    AlertService
  ]
})
export class AgendaModule {
}
