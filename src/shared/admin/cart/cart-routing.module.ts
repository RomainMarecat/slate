import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { AdminGuard } from '../../guard/admin.guard';
import { CartEditComponent } from './cart-edit/cart-edit.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: CartComponent,
    data: {
      breadcrumb: 'breadcrumb.cart.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: CartListComponent,
        data: {
          breadcrumb: 'breadcrumb.cart.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: CartEditComponent,
        data: {
          breadcrumb: 'breadcrumb.cart.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: CartEditComponent,
        data: {
          breadcrumb: 'breadcrumb.cart.edit'
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
export class CartRoutingModule {
}
