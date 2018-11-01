import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeModule } from './home/home.module';
import { RecipeModule } from './recipe/recipe.module';
import { SearchModule } from './search/search.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PreparationModule } from './preparation/preparation.module';
import { InstructionModule } from './instruction/instruction.module';

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
