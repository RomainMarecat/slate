import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BookingSummaryComponent } from './booking-summary.component';


@NgModule({
  declarations: [BookingSummaryComponent],
  exports: [BookingSummaryComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ]
})
export class BookingSummaryModule {
}
