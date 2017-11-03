import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AdminGuard } from './../shared/guard/admin.guard';

const routes: Routes = [{
  path: 'admin',
  pathMatch: 'full',
  canActivate: [AdminGuard],
  children: [{
      path: '',
      component: HomeComponent
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
export class AdminRoutingModule {}
