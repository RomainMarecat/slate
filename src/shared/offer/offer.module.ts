import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {PartnerModule} from '../partner/partner.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    PartnerModule
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
