import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guard/admin.guard';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    canActivate: [AdminGuard],
  },
  {
    path: 'list',
    canActivate: [AdminGuard],
    component: CategoryListComponent
  },
  {
    path: 'add',
    canActivate: [AdminGuard],
    component: CategoryAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
