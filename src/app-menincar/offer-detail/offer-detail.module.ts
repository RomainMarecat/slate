import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferDetailRoutingModule } from './offer-detail-routing.module';
import { OfferDetailComponent } from './offer-detail/offer-detail/offer-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OfferDetailRoutingModule,
    SharedModule
  ],
  declarations: [OfferDetailComponent]
})
export class OfferDetailModule { }
