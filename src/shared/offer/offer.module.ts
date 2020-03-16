import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PartnerModule } from '../partner/partner.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    PartnerModule,
    TranslateModule,
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
export class OfferModule {
}
