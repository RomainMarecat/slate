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
    loadChildren: './product/car-product.module#CarProductModule'
  }, {
    path: 'area/:key/products',
    loadChildren: './product/car-product.module#CarProductModule'
  }, {
    path: 'product/add/new',
    loadChildren: './offer-edit/car-offer-edit.module#CarOfferEditModule'
  }, {
    path: 'offer/:key',
    loadChildren: './offer-detail/offer-detail.module#OfferDetailModule'
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
