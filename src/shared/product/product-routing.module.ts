import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from 'shared/product/product-list/product-list.component';
import { ProductAddComponent } from 'shared/product/product-add/product-add.component';
import { UserGuard } from 'shared/guard/user.guard';
import { ProductDetailComponent } from 'shared/product/product-detail/product-detail.component';

const routes: Routes = [
  {
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      pathMatch: 'full',
      component: ProductListComponent
    }]
  },
  {
    path: 'list',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: ProductAddComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'product/:key',
    component: ProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
