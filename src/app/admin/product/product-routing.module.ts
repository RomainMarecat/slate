import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../../shared/guard/admin.guard';
import { ProductComponent } from './product.component';

const routes: Routes = [{
  path: 'product',
  canActivate: [AdminGuard],
  children: [{
      path: '',
      component: ProductComponent
    },
    {
      path: 'list',
      component: ProductComponent
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
