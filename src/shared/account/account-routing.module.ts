import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { AccountComponent } from './account/account.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'orders',
        loadChildren: './../order/order.module#OrderModule'
      },
      {
        path: 'preferences',
        loadChildren: './../preference/preference.module#PreferenceModule'
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
