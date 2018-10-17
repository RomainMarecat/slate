import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from 'shared/product/product-list/product-list.component';
import { ProductAddComponent } from 'shared/product/product-add/product-add.component';
import { ProductDetailComponent } from 'shared/product/product-detail/product-detail.component';
import { UserGuard } from 'shared/guard/user.guard';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      breadcrumb: 'breadcrumb.products.list'
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
    path: 'add-product',
    component: ProductAddComponent,
    canActivate: [UserGuard],
    data: {
      breadcrumb: 'breadcrumb.products.add'
    }
  },
  {
    path: 'map/area/:key/products',
    component: ProductListComponent,
    data: {
      breadcrumb: 'breadcrumb.products.list'
    }
  },
  {
    path: 'product/:key',
    component: ProductDetailComponent,
    data: {
      breadcrumb: 'breadcrumb.products.detail'
    }
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
export class ProductRoutingModule {
}
