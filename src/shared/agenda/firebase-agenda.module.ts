import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { FirebaseAgendaRoutingModule } from './firebase-agenda-routing.module';
import { SharedFirebaseAgendaModule } from './shared-firebase-agenda.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    FirebaseAgendaRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    NgxCalendarModule,
    TranslateModule.forChild(),
    SharedFirebaseAgendaModule
  ],
  exports: [
    SharedFirebaseAgendaModule
  ]
})
export class FirebaseAgendaModule {
}
