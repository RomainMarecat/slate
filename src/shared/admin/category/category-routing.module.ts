import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { LocalizeRouterModule } from 'localize-router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    canActivate: [AdminGuard],
    data: {
      breadcrumb: 'breadcrumb.category.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: CategoryListComponent,
        data: {
          breadcrumb: 'breadcrumb.category.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: CategoryAddComponent,
        data: {
          breadcrumb: 'breadcrumb.category.add'
        },
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class CategoryRoutingModule {
}
