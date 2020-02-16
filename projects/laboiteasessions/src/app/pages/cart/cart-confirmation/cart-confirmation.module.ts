import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartConfirmationRoutingModule } from './cart-confirmation-routing.module';
import { CartConfirmationComponent } from './cart-confirmation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [CartConfirmationComponent],
  exports: [CartConfirmationComponent],
  imports: [
    CommonModule,
    CartConfirmationRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexModule
  ]
})
export class CartConfirmationModule {
}
