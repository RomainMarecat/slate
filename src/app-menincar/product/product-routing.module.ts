import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: 'area/:area/products',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: 'selection/:category/products',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: 'product/:key',
    pathMatch: 'full',
    component: ProductDetailComponent
  }];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule {
}
