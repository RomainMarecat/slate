import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule
  ],
  declarations: [
    OfferListComponent,
    OfferDetailComponent
  ],
  exports: [
    OfferListComponent,
    OfferDetailComponent
  ],
  providers: [
    OfferService
  ]
})
export class OfferModule {}
