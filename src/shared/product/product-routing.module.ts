import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { UserGuard } from '../guard/user.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    data: {
      breadcrumb: 'breadcrumb.product-list'
    },
    children: [
      {
        path: 'detail/:slug',
        component: ProductDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.product-detail'
        }
      },
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'map/area/:key/products',
        component: ProductListComponent,
        data: {
          breadcrumb: 'breadcrumb.product-list'
        }
      },
    ]
  },
  {
    path: 'add-product',
    component: ProductAddComponent,
    canActivate: [UserGuard],
    data: {
      breadcrumb: 'breadcrumb.product-add'
    }
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
