import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';
import { FirebaseAgendaComponent } from './agenda/firebase-agenda.component';
import { FirebaseAgendaRoutingModule } from './firebase-agenda-routing.module';

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
    TranslateModule.forChild()
  ],
  exports: [
    FirebaseAgendaComponent
  ],
  declarations: [
    FirebaseAgendaComponent
  ]
})
export class FirebaseAgendaModule {
}
