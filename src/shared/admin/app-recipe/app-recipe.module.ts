import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRecipeRoutingModule } from './app-recipe-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  imports: [
    CommonModule,
    AppRecipeRoutingModule,
    RecipeModule,
    TranslateModule.forChild(),
  ],
})
export class AppRecipeModule {
}
