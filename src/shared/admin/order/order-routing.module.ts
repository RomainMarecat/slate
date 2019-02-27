import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { LocalizeRouterModule } from 'localize-router';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: OrderComponent,
    data: {
      breadcrumb: 'breadcrumb.order.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: OrderListComponent,
        data: {
          breadcrumb: 'breadcrumb.order.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: OrderEditComponent,
        data: {
          breadcrumb: 'breadcrumb.order.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: OrderEditComponent,
        data: {
          breadcrumb: 'breadcrumb.order.edit'
        },
      },
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
export class OrderRoutingModule {
}
