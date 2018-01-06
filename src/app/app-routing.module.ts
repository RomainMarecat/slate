import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserGuard } from '../shared/guard/user.guard';

const routes: Routes = [{
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
  {
    path: 'admin',
    loadChildren: './../shared/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
