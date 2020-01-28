import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingMonoCardComponent } from './booking-mono-card.component';


@NgModule({
  declarations: [
    BookingMonoCardComponent
  ],
  exports: [
    BookingMonoCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookingMonoCardModule {
}
