import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferEditRoutingModule } from './offer-edit-routing.module';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { NgArrayPipesModule, RangePipe } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment.car';
import { OfferConfirmationComponent } from './offer-confirmation/offer-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    NgArrayPipesModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    OfferEditRoutingModule
  ],
  declarations: [OfferEditComponent, OfferConfirmationComponent],
  providers: [RangePipe]
})
export class CarOfferEditModule { }
