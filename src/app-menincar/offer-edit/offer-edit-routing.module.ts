import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { OfferConfirmationComponent } from './offer-confirmation/offer-confirmation.component';

const routes: Routes = [
  {
    path: 'offer/add/new',
    pathMatch: 'full',
    component: OfferEditComponent
  },
  {
    path: 'offer/:key/edit',
    pathMatch: 'full',
    component: OfferEditComponent
  },
   {
    path: 'offer/:key/confirmation',
    pathMatch: 'full',
    component: OfferConfirmationComponent
  },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OfferEditRoutingModule {
}
