import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';

import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleAgendaRoutingModule } from './simple-agenda-routing.module';
import { SimpleAgendaComponent } from './simple-agenda/simple-agenda.component';

@NgModule({
  declarations: [
    SimpleAgendaComponent,
  ],
  imports: [
    SimpleAgendaRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    NgxCalendarModule,
    TranslateModule.forChild()
  ]
})
export class SimpleAgendaModule {
}
