import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { OfferItemComponent } from './offer-item/offer-item.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferListRoutingModule } from './offer-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    OfferListRoutingModule
  ],
  declarations: [
    OfferListComponent,
    OfferItemComponent
  ]
})
export class CarOfferListModule {
}
