import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../core/shared/guard/admin.guard';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [{
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
