import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: ProductComponent,
    data: {
      breadcrumb: 'breadcrumb.product.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: ProductListComponent,
        data: {
          breadcrumb: 'breadcrumb.product.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: ProductEditComponent,
        data: {
          breadcrumb: 'breadcrumb.product.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: ProductEditComponent,
        data: {
          breadcrumb: 'breadcrumb.product.edit'
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
export class ProductRoutingModule {
}
