import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCalendarModule } from '@romainmarecat/ngx-calendar';

import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleAgendaRoutingModule } from './simple-agenda-routing.module';
import { SimpleAgendaComponent } from './simple-agenda/simple-agenda.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

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
