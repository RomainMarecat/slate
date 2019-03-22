import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBestModule } from './product-best/product-best.module';
import { ProductNewModule } from './product-new/product-new.module';
import { ProductRecentMonthModule } from './product-recent-month/product-recent-month.module';

@NgModule({
  exports: [
    CommonModule,
    ProductBestModule,
    ProductNewModule,
    ProductRecentMonthModule
  ],
})
export class ProductModule {
}
