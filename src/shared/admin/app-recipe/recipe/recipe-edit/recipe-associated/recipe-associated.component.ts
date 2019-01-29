import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../../../../../app-recipe/public/recipe/shared/recipe.service';
import { Recipe } from '../../../../../../app-recipe/public/recipe/shared/recipe';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-recipe-associated',
  templateUrl: './recipe-associated.component.html',
  styleUrls: ['./recipe-associated.component.scss']
})
export class RecipeAssociatedComponent implements OnInit {

  recipes: Recipe[];

  @Input() recipe: Recipe;

  _form: FormControl = new FormControl([]);

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes.filter((r) => r.key !== this.recipe.key);
      }, () => {
        this.recipes = [];
      });
  }

  @Input() set form(form: FormControl) {
    this._form = form;
  }

  get form(): FormControl {
    return this._form;
  }
}
