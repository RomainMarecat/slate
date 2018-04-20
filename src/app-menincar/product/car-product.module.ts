import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OfferItemComponent } from './offer-item/offer-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    OfferItemComponent
  ]
})
export class CarProductModule {
}
