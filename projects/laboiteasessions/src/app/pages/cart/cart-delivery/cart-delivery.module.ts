import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartDeliveryRoutingModule } from './cart-delivery-routing.module';
import { CartDeliveryComponent } from './cart-delivery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CartDeliveryComponent],
  exports: [CartDeliveryComponent],
  imports: [
    CommonModule,
    CartDeliveryRoutingModule,
    ReactiveFormsModule,
    FlexModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule
  ]
})
export class CartDeliveryModule { }
