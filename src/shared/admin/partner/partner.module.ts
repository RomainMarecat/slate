import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerEditComponent } from './partner-edit/partner-edit.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFirestore } from '@angular/fire/firestore';
import { PartnerOffersComponent } from './partner-offers/partner-offers.component';
import { PartnerService } from '../../partner/partner.service';
import { PartnerImportComponent } from './partner-import/partner-import.component';
import { PartnerImportPreviewComponent } from './partner-import-preview/partner-import-preview.component';
import { PartnerComponent } from './partner/partner.component';

const TABLE_PARTNER = new InjectionToken<string>('partner');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    PartnerRoutingModule,
    SharedModule
  ],
  entryComponents: [
    PartnerImportPreviewComponent
  ],
  declarations: [
    PartnerListComponent,
    PartnerEditComponent,
    PartnerOffersComponent,
    PartnerImportComponent,
    PartnerImportPreviewComponent,
    PartnerComponent
  ],
  providers: [
    {provide: TABLE_PARTNER, useValue: 'partner'},
    {provide: PartnerService, useClass: PartnerService, deps: [AngularFirestore, TABLE_PARTNER]},
  ]
})
export class PartnerModule {
}
