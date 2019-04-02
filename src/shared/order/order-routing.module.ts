import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { LocalizeRouterModule } from 'localize-router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    data: {
      breadcrumb: 'breadcrumb.order-list',
    },
    children: [
      {
        path: '',
        component: OrderListComponent,
      },
      {
        path: ':key/detail',
        component: OrderDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.order-detail',
        },
      }
    ]
  },
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
export class OrderRoutingModule {
}
