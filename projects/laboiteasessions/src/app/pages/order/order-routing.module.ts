import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderComponent,
    children: [
      {
        path: '',
        component: OrderListComponent,
      },
      {
        path: ':key/detail',
        component: OrderDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class OrderRoutingModule {
}
