import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferListComponent } from './offer-list/offer-list.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: 'area/:area/products',
    pathMatch: 'full',
    component: OfferListComponent
  },
  {
    path: 'selection/:category/products',
    pathMatch: 'full',
    component: OfferListComponent
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class OfferListRoutingModule {
}
