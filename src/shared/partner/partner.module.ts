import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerService } from './partner.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    PartnerService
  ]
})
export class PartnerModule {}
