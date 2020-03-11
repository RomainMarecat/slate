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
        loadChildren: () => import('./../order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'preferences',
        loadChildren: () => import('./../preference/preference.module').then(m => m.PreferenceModule)
      },
      {
        path: 'deliveries',
        loadChildren: () => import('./../delivery/delivery.module').then(m => m.DeliveryModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./../favorite/favorite.module').then(m => m.FavoriteModule)
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
