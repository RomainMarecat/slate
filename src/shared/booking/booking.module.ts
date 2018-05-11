import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingService } from './shared/booking.service';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule
  ],
  declarations: [
    BookingAddComponent
  ],
  providers: [
    BookingService
  ]
})
export class BookingModule {
}
