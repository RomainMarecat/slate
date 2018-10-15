import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
    component: ProductComponent
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: ProductListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: ProductEditComponent
  },
  {
    path: 'edit/:key',
    canActivate: [AdminGuard],
    component: ProductEditComponent
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
