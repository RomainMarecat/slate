import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListModule } from './product-list/product-list.module';

@NgModule({
  exports: [
    CommonModule,
    ProductListModule,
  ],
})
export class ProductModule {
}
