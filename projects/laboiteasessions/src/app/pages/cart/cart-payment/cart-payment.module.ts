import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPaymentRoutingModule } from './cart-payment-routing.module';
import { CartPaymentComponent } from './cart-payment.component';
import { FlexModule } from '@angular/flex-layout';
import { NgxStripeModule, STRIPE_PUBLISHABLE_KEY } from 'ngx-stripe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { STRIPE_KEY } from '../../../app.module';

export function NgxStripeFactory(key: string): string {
  return key;
}

@NgModule({
  declarations: [CartPaymentComponent],
  exports: [CartPaymentComponent],
  imports: [
    CommonModule,
    CartPaymentRoutingModule,
    FlexModule,
    NgxStripeModule.forRoot(''),
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [
    {
      provide: STRIPE_PUBLISHABLE_KEY,
      useFactory: NgxStripeFactory,
      deps: [
        STRIPE_KEY
      ]
    }
  ]
})
export class CartPaymentModule {
}
