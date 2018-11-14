import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../../app-recipe/public/recipe/shared/recipe';

export class RecipeFormType {
  private form: FormGroup;

  constructor(recipe ?: Recipe) {
    this.createForm(recipe);
  }

  createForm(recipe: Recipe) {
    this.form = new FormGroup({
      name: new FormControl(recipe && recipe.name ? recipe.name : '', [
        Validators.required,
      ]),
      slug: new FormControl(recipe && recipe.slug ? recipe.slug : '', [
        Validators.required
      ]),
    });
  }

  getForm() {
    return this.form;
  }
}
