import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../../../shared/guard/admin.guard';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
{
  path: 'category',
  pathMatch: 'full',
  canActivate: [AdminGuard],
  children: [{
      path: '',
      component: CategoryComponent
    },
    {
      path: 'list',
      component: CategoryListComponent
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
