import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: ':slug',
    component: RecipeDetailComponent
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
export class RecipeDetailRoutingModule {
}
