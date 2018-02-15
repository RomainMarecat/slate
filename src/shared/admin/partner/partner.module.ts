import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PartnerService } from './../shared/partner/partner.service';
import { AngularFirestore } from 'angularfire2/firestore';

const TABLE_NAME = new InjectionToken < string > ('partner');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PartnerRoutingModule,
    SharedModule
  ],
  declarations: [PartnerListComponent, PartnerEditComponent],
  providers: [
    { provide: TABLE_NAME, useValue: 'partner' },
    { provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_NAME] },
  ]
})
export class PartnerModule {}
