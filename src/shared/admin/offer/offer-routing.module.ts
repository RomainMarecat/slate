import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferEditComponent } from './offer-edit/offer-edit.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule {}
