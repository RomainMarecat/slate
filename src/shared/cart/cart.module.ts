import { InjectionToken, NgModule } from '@angular/core';
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
import { RoutingState } from '../util/routing-state';
import { AngularFirestore } from 'angularfire2/firestore';

export const TABLE_CART = new InjectionToken<string>('cart');
export const TABLE_PAYMENT = new InjectionToken<string>('payment');
export const STRIPE_KEY = new InjectionToken<string>('');


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
    TranslateModule.forChild(),
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
    {provide: TABLE_CART, useValue: 'cart'},
    {provide: STRIPE_KEY, useValue: 'pk_test_ZMBhVWlsAzGDErk8PFH28TWX'},
    {provide: TABLE_PAYMENT, useValue: 'payment'},
    {provide: CartService, useClass: CartService, deps: [AngularFirestore, TABLE_CART]},
    {provide: PaymentService, useClass: PaymentService, deps: [AngularFirestore, TABLE_PAYMENT, STRIPE_KEY]},
    RoutingState
  ]
})
export class CartModule {
}
