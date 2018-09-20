import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferEditComponent } from './offer-edit/offer-edit.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  canActivate: [AdminGuard],
  component: OfferListComponent
},
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: OfferListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: OfferEditComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: OfferEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class OfferRoutingModule {
}
