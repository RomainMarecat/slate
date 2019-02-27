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
      breadcrumb: 'breadcrumb.products.title'
    },
    children: [
      {
        path: 'detail/:key',
        component: ProductDetailComponent,
        data: {
          breadcrumb: 'breadcrumb.products.detail'
        }
      },
      {
        path: 'list',
        component: ProductListComponent,
        data: {
          breadcrumb: 'breadcrumb.products.list'
        }
      },
      {
        path: '',
        component: ProductListComponent,
        data: {
          breadcrumb: 'breadcrumb.products.list'
        }
      },
      {
        path: 'map/area/:key/products',
        component: ProductListComponent,
        data: {
          breadcrumb: 'breadcrumb.products.list'
        }
      },
    ]
  },
  {
    path: 'add-product',
    component: ProductAddComponent,
    canActivate: [UserGuard],
    data: {
      breadcrumb: 'breadcrumb.products.add'
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
