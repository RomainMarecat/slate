import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from '../admin/shared/offer/offer.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    OfferService
  ]
})
export class OfferModule {}
