import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferDetailComponent } from './offer-detail/offer-detail/offer-detail.component';

const routes: Routes = [ {
  path: 'offer/:key',
  pathMatch: 'full',
  component: OfferDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferDetailRoutingModule { }
