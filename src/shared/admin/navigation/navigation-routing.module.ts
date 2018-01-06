import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';

const routes: Routes = [{
    canActivate: [AdminGuard],
    path: 'category',
    loadChildren: './category/category.module#CategoryModule'
  },
  {
    canActivate: [AdminGuard],
    path: 'selection',
    loadChildren: './selection/selection.module#SelectionModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule {}
