import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { MaterialRoutingModule } from './material-routing.module';
import { NgxCarouselModule } from 'ngx-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MaterialRoutingModule,
    NgxCarouselModule,
    TranslateModule.forChild()
  ],
  declarations: [SummaryComponent],
  exports: [
    SummaryComponent
  ]
})
export class MaterialModule {
}
