import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [ {
  // On root we go to root. On other route we start with this route and go on children route
  path: '',
  redirectTo: '',
  pathMatch: 'full',
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    } ]
},
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  }, {
    path: 'selection/:key/products',
    loadChildren: './offer/car-offer-list.module#CarOfferListModule'
  }, {
    path: 'area/:key/products',
    loadChildren: './offer/car-offer-list.module#CarOfferListModule'
  }, {
    path: 'product/add/new',
    loadChildren: './offer-edit/car-offer-edit.module#CarOfferEditModule'
  }, {
    path: 'offer/:key',
    loadChildren: './offer-detail/car-offer-detail.module#CarOfferDetailModule'
  },
  {
    path: 'content/:title',
    loadChildren: './../shared/cms-detail/cms-detail.module#CmsDetailModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
