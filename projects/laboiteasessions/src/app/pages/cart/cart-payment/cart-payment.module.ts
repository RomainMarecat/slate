import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPaymentRoutingModule } from './cart-payment-routing.module';
import { CartPaymentComponent } from './cart-payment.component';
import { FlexModule } from '@angular/flex-layout';
import { NgxStripeModule } from 'ngx-stripe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CartPaymentComponent],
  exports: [CartPaymentComponent],
  imports: [
    CommonModule,
    CartPaymentRoutingModule,
    FlexModule,
    NgxStripeModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ]
})
export class CartPaymentModule {
}
