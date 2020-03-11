import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionListComponent } from './selection/selection-list/selection-list.component';

const routes: Routes = [{
    // On root we go to root. On other route we start with this route and go on children route
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    children: [{
      path: '',
      pathMatch: 'full',
      component: SelectionListComponent
    }]
  },
  {
    path: 'selection/:key/products',
    loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule)
  },
  {
    path: 'product/:key',
    loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./../shared/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
