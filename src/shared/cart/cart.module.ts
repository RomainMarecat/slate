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

@NgModule({
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  declarations: [
    CartListComponent,
    CartItemComponent,
    CartPaymentComponent,
    CartConfirmationComponent
  ],
  exports: [
    CartListComponent,
    CartItemComponent,
    CartPaymentComponent,
    CartConfirmationComponent
  ],
  providers: [
    CartService
  ]
})
export class CartModule {
}
