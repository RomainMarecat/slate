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
    loadChildren: () => import('./../shared/admin/admin.module').then(m => m.AdminModule)
  }, {
    path: 'selection/:key/products',
    loadChildren: () => import('./offer/car-offer-list.module').then(m => m.CarOfferListModule)
  }, {
    path: 'area/:key/products',
    loadChildren: () => import('./offer/car-offer-list.module').then(m => m.CarOfferListModule)
  }, {
    path: 'product/add/new',
    loadChildren: () => import('./offer-edit/car-offer-edit.module').then(m => m.CarOfferEditModule)
  }, {
    path: 'offer/:key',
    loadChildren: () => import('./offer-detail/car-offer-detail.module').then(m => m.CarOfferDetailModule)
  },
  {
    path: 'content/:title',
    loadChildren: () => import('./../shared/cms-detail/cms-detail.module').then(m => m.CmsDetailModule)
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
