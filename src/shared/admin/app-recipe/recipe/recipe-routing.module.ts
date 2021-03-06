import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { AdminGuard } from '../../../guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: RecipeComponent,
    data: {
      breadcrumb: 'breadcrumb.recipe.title'
    },
    children: [
      {
        path: '',
        component: RecipeListComponent,
        data: {
          breadcrumb: 'breadcrumb.recipe.list'
        },
      },
      {
        path: 'add',
        component: RecipeEditComponent,
        data: {
          breadcrumb: 'breadcrumb.recipe.add'
        },
      },
      {
        path: 'edit/:key',
        component: RecipeEditComponent,
        data: {
          breadcrumb: 'breadcrumb.recipe.edit'
        },
      },
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
export class RecipeRoutingModule {
}
