import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../../guard/admin.guard';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

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
        canActivate: [AdminGuard],
        component: RecipeListComponent,
        data: {
          breadcrumb: 'breadcrumb.recipe.list'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: RecipeEditComponent,
        data: {
          breadcrumb: 'breadcrumb.recipe.add'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
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
