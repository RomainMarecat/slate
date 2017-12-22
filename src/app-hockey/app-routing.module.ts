import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list/product-list.component';
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
    path: 'admin',
    loadChildren: './../core/shared/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
