import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline/timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    TimelineRoutingModule,
    TranslateModule
  ],
  declarations: [TimelineComponent]
})
export class TimelineModule {
}
