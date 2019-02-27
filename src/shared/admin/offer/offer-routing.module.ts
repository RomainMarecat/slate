import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { OfferComponent } from './offer/offer.component';

const routes: Routes = [{
  path: '',
  canActivate: [AdminGuard],
  component: OfferComponent,
  data: {
    breadcrumb: 'breadcrumb.offer.title'
  },
  children: [
    {
      path: '',
      canActivate: [AdminGuard],
      component: OfferListComponent,
      data: {
        breadcrumb: 'breadcrumb.offer.list'
      },
    },
    {
      path: 'add',
      canActivate: [AdminGuard],
      component: OfferEditComponent,
      data: {
        breadcrumb: 'breadcrumb.offer.add'
      },
    },
    {
      path: 'edit/:key',
      canActivate: [AdminGuard],
      component: OfferEditComponent,
      data: {
        breadcrumb: 'breadcrumb.offer.edit'
      },
    },
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class OfferRoutingModule {
}
