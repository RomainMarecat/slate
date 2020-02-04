import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart-list.component';
import { CartItemModule } from './cart-item/cart-item.module';


@NgModule({
  declarations: [CartListComponent],
  exports: [CartListComponent],
  imports: [
    CommonModule,
    CartItemModule
  ]
})
export class CartListModule {
}
