import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { RecipeModule } from './recipe/recipe.module';
import { SearchModule } from '../../shared/search/search.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PreparationModule } from './preparation/preparation.module';

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
  declarations: []
})
export class PublicModule { }
