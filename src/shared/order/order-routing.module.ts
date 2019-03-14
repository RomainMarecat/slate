import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from '../cart/cart/cart.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LocalizeRouterModule } from 'localize-router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: '',
        component: OrderListComponent
      },
      {
        path: ':key/detail',
        component: OrderDetailComponent
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
