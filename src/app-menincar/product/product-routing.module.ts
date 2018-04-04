import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: 'selection/:key/products',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: 'product/:key',
    pathMatch: 'full',
    component: ProductDetailComponent
  },
  {
    path: 'product/:key/edit',
    pathMatch: 'full',
    component: ProductEditComponent
  } ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule {
}
