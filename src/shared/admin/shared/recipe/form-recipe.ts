import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../../app-recipe/public/recipe/shared/recipe';
import { Instruction } from '../../../../app-recipe/public/instruction/shared/instruction';
import { Ingredient } from '../../../../app-recipe/public/ingredient/shared/ingredient';
import { Preparation } from '../../../../app-recipe/public/preparation/shared/preparation';

export class RecipeFormType {
  private form: FormGroup;

  static getInstruction(orderIndex: number): FormGroup {
    return new FormGroup({
      key: new FormControl(''),
      order_index: new FormControl(orderIndex),
      sentence: new FormControl(''),
      ingredients: new FormControl([]),
      image: new FormControl('')
    });
  }

  static getIngredient(): FormGroup {
    return new FormGroup({
      key: new FormControl(''),
      color: new FormControl(''),
      name: new FormControl(''),
    });
  }

  static getPreparation(): FormGroup {
    return new FormGroup({
      key: new FormControl(''),
      ingredient: new FormGroup({
        key: new FormControl(''),
        color: new FormControl(''),
        name: new FormControl(''),
      }),
      quantity: new FormControl(1),
      sentence: new FormControl(''),
    });
  }

  constructor(recipe ?: Recipe) {
    this.createForm(recipe);
  }

  createForm(recipe: Recipe) {
    this.form = new FormGroup({
      name: new FormControl(recipe && recipe.name ? recipe.name : '', [
        Validators.required,
      ]),
      slug: new FormControl(recipe && recipe.slug ? recipe.slug : ''),
      cuisine_type: new FormControl(recipe && recipe.cuisine_type ? recipe.cuisine_type : '', [
        Validators.required
      ]),
      cook_time: new FormControl(recipe && recipe.cook_time ? recipe.cook_time : '01:00', [
        Validators.required
      ]),
      prep_time: new FormControl(recipe && recipe.prep_time ? recipe.prep_time : '01:00', [
        Validators.required
      ]),
      total_time: new FormControl(recipe && recipe.total_time ? recipe.total_time : '02:00', [
        Validators.required
      ]),
      waiting_time: new FormControl(recipe && recipe.waiting_time ? recipe.waiting_time : '00:00', [
        Validators.required
      ]),
      creator: new FormControl(recipe && recipe.creator ? recipe.creator : 'Anne-lise', [
        Validators.required
      ]),
      yield: new FormControl(recipe && recipe.yield ? recipe.yield : 4, [
        Validators.required
      ]),
      color: new FormControl(recipe && recipe.color ? recipe.color : '', [
        Validators.required
      ]),
      image: new FormControl(recipe && recipe.image ? recipe.image : '', [
        Validators.required
      ]),
      rating: new FormControl(recipe && recipe.rating ? recipe.rating : 0, []),
      on_homepage: new FormControl(recipe && recipe.on_homepage ? recipe.on_homepage : false),
      instructions: new FormArray(this.getInstructions(recipe)),
      preparations: new FormArray(this.getPreparations(recipe)),
      ingredients: new FormArray(this.getRecipeIngredients(recipe)),
    });
  }

  getInstructions(recipe: Recipe): Array<FormGroup> {
    if (recipe && recipe.instructions && recipe.instructions.length > 0) {
      return recipe.instructions.map((instruction: Instruction) => {
        return new FormGroup({
          key: new FormControl(instruction.key),
          order_index: new FormControl(instruction.order_index, [Validators.required]),
          sentence: new FormControl(instruction.sentence, [Validators.required]),
          ingredients: new FormControl(this.getIngredients(instruction)),
          image: new FormControl(instruction.image)
        });
      });
    }

    return [
      new FormGroup({
        key: new FormControl(''),
        order_index: new FormControl(1, [Validators.required]),
        sentence: new FormControl('', [Validators.required]),
        ingredients: new FormArray([]),
        image: new FormControl('', [Validators.required])
      })
    ];
  }

  getRecipeIngredients(recipe: Recipe): Array<FormGroup> {
    if (recipe && recipe.ingredients && recipe.ingredients.length > 0) {
      return recipe.ingredients.map((ingredient: Ingredient) => {
        return new FormGroup({
          key: new FormControl(ingredient.key),
          color: new FormControl(ingredient.color, [Validators.required]),
          name: new FormControl(ingredient.name, [Validators.required]),
        });
      });
    }
    return [
      new FormGroup({
        key: new FormControl(''),
        color: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
      })
    ];
  }

  getIngredients(instruction: Instruction): Ingredient[] {
    if (instruction && instruction.ingredients && instruction.ingredients.length > 0) {
      return instruction.ingredients;
    }
    return [];
  }

  getPreparations(recipe: Recipe): Array<FormGroup> {
    if (recipe && recipe.preparations && recipe.preparations.length > 0) {
      return recipe.preparations.map((preparation: Preparation) => {
        return new FormGroup({
          key: new FormControl(preparation.key),
          ingredient: new FormGroup({
            key: new FormControl(preparation.ingredient.key),
            color: new FormControl(preparation.ingredient.color),
            name: new FormControl(preparation.ingredient.name),
          }),
          quantity: new FormControl(preparation.quantity),
          sentence: new FormControl(preparation.sentence),
        });
      });
    }

    return [
      new FormGroup({
        key: new FormControl(''),
        ingredient: new FormGroup({
          key: new FormControl(''),
          color: new FormControl(''),
          name: new FormControl(''),
        }),
        quantity: new FormControl(1),
        sentence: new FormControl(''),
      })
    ];
  }

  getForm() {
    return this.form;
  }
}
