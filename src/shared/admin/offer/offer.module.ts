import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OfferService } from '../shared/offer/offer.service';
import { AngularFirestore } from 'angularfire2/firestore';

const TABLE_OFFER = new InjectionToken<string>('offer');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule,
    OfferRoutingModule
  ],
  declarations: [ OfferListComponent, OfferEditComponent ],
  providers: [
    {provide: TABLE_OFFER, useValue: 'offer'},
    {provide: OfferService, useClass: OfferService, deps: [ AngularFirestore, TABLE_OFFER ]},
  ]
})
export class OfferModule {
}
