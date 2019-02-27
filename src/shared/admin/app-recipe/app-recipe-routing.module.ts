import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: 'recipe',
    loadChildren: './recipe/recipe.module#RecipeModule'
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
export class AppRecipeRoutingModule {
}
