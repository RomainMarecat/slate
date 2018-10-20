import { InjectionToken, NgModule } from '@angular/core';
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
import { SessionService } from '../session/shared/session.service';
import { AngularFirestore } from '@angular/fire/firestore';

export const TABLE_SESSION = new InjectionToken<string>('session');
export const TABLE_EVENT = new InjectionToken<string>('event');

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
    {provide: TABLE_SESSION, useValue: 'session'},
    {provide: TABLE_EVENT, useValue: 'event'},
    {provide: EventService, useClass: EventService, deps: [AngularFirestore, TABLE_EVENT]},
    AlertService,
    {provide: SessionService, useClass: SessionService, deps: [AngularFirestore, TABLE_SESSION]},

  ]
})
export class AgendaModule {
}
