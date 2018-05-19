import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPaymentComponent } from './cart-payment/cart-payment.component';
import { CartConfirmationComponent } from './cart-confirmation/cart-confirmation.component';
import { CartService } from './shared/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { PaymentService } from '../payment/shared/payment.service';
import { CartEditComponent } from './cart-edit/cart-edit.component';
import { CartComponent } from './cart/cart.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxStripeModule.forRoot('pk_test_ZMBhVWlsAzGDErk8PFH28TWX'),
    TranslateModule,
  ],
  declarations: [
    CartListComponent,
    CartItemComponent,
    CartPaymentComponent,
    CartConfirmationComponent,
    CartEditComponent,
    CartComponent,
  ],
  exports: [
    CartListComponent,
    CartItemComponent,
    CartPaymentComponent,
    CartConfirmationComponent,
    CartEditComponent,
    CartComponent,
  ],
  providers: [
    CartService,
    PaymentService
  ]
})
export class CartModule {
}
