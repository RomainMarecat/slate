import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerService } from './partner.service';
import { PartnerNameComponent } from './partner-name/partner-name.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PartnerNameComponent
  ],
  exports: [
    PartnerNameComponent
  ],
  providers: [
    PartnerService
  ]
})
export class PartnerModule {}
