import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { AdminGuard } from '../../guard/admin.guard';

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
