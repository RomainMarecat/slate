import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PreparationModule } from './preparation/preparation.module';
import { SearchModule } from 'shared/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    IngredientModule,
    PreparationModule,
    RecipeModule,
    SearchModule,
    PublicRoutingModule,
  ],
})
export class PublicModule {
}
