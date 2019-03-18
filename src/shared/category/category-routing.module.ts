import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { LocalizeRouterModule } from 'localize-router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryComponent,
    children: [
      {
        path: ':key',
        component: CategoryDetailComponent
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
