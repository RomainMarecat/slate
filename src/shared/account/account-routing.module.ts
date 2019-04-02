import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { AccountComponent } from './account/account.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'breadcrumb.account',
    },
    component: AccountComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'orders',
        loadChildren: './../order/order.module#OrderModule',
      },
      {
        path: 'preferences',
        loadChildren: './../preference/preference.module#PreferenceModule'
      },
      {
        path: 'deliveries',
        loadChildren: './../delivery/delivery.module#DeliveryModule'
      },
      {
        path: 'favorites',
        loadChildren: './../favorite/favorite.module#FavoriteModule'
      }
    ]
  }
];

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
export class AccountRoutingModule {
}
