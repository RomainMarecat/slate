import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IngredientRoutingModule
  ],
  declarations: [IngredientListComponent, IngredientDetailComponent]
})
export class IngredientModule { }
