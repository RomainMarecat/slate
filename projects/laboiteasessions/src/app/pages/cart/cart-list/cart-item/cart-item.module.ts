import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CartItemComponent],
  exports: [CartItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexModule,
    FormsModule,
    MatIconModule
  ]
})
export class CartItemModule {
}
