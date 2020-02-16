import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartEditRoutingModule } from './cart-edit-routing.module';
import { CartEditComponent } from './cart-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartListModule } from '../cart-list/cart-list.module';


@NgModule({
  declarations: [CartEditComponent],
  imports: [
    CommonModule,
    CartListModule,
    CartEditRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    ExtendedModule
  ]
})
export class CartEditModule {
}
