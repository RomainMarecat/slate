import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookingMonoCardModule } from '../booking-mono-card/booking-mono-card.module';
import { BookingSummaryModule } from '../booking-summary/booking-summary.module';
import { PipePaymentComponent } from './pipe-payment.component';
import { StripeFormComponent } from './stripe-form/stripe-form.component';


@NgModule({
  declarations: [
    PipePaymentComponent,
    StripeFormComponent
  ],
  exports: [
    PipePaymentComponent,
    StripeFormComponent
  ],
  imports: [
    CommonModule,
    BookingSummaryModule,
    BookingMonoCardModule
  ]
})
export class PipePaymentModule {
}
