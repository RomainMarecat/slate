import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFirestore } from 'angularfire2/firestore';
import { PartnerOffersComponent } from './partner-offers/partner-offers.component';
import { PartnerService } from '../../partner/partner.service';

const TABLE_PARTNER = new InjectionToken<string>('partner');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PartnerRoutingModule,
    SharedModule
  ],
  declarations: [ PartnerListComponent, PartnerEditComponent, PartnerOffersComponent ],
  providers: [
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: PartnerService, useClass: PartnerService, deps: [ AngularFirestore, TABLE_PARTNER ]},
  ]
})
export class PartnerModule {
}
