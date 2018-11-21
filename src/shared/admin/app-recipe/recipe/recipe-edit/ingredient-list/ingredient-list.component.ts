import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../../../../../app-recipe/public/ingredient/shared/ingredient';
import { IngredientService } from '../../../../../../app-recipe/public/ingredient/shared/ingredient.service';
import { Recipe } from '../../../../../../app-recipe/public/recipe/shared/recipe';

@Component({
  selector: 'app-admin-recipe-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss']
})
export class IngredientListComponent implements OnInit {

  _recipe: Recipe;

  ingredients: Ingredient[] = [];

  @Output() ingredientSelected: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor(private ingredientService: IngredientService) {
  }

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients(recipe?: Recipe) {
    if (recipe) {
      this.ingredientService.query$.next({
        filters: [{
          column: 'recipes',
          value: recipe.key,
          operator: '=='
        }]
      });
    }
    this.ingredientService.getIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }, (err) => {
        this.ingredients = [];
      });
  }

  onSelect(event: Ingredient) {
    this.ingredientSelected.next(event);
  }


  @Input() set recipe(recipe: Recipe) {
    this._recipe = recipe;
    if (recipe) {
      this.getIngredients(recipe);
    }
  }

  get recipe(): Recipe {
    return this._recipe;
  }
}
