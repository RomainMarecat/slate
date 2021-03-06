import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { Ingredient } from '../../../../../app-recipe/ingredient/shared/ingredient';
import { IngredientService } from '../../../../../app-recipe/ingredient/shared/ingredient.service';
import { Recipe } from '../../../../../app-recipe/recipe/shared/recipe';
import { RecipeService } from '../../../../../app-recipe/recipe/shared/recipe.service';
import { ContrastService } from '../../../../contrast/contrast.service';
import { Media } from '../../../../media/media';
import { AlertService } from '../../../../popup/alert.service';
import { StringService } from '../../../../util/string.service';
import { BaseEditComponent } from '../../../base/base-edit/base-edit.component';
import { RecipeFormType } from '../../../shared/recipe/form-recipe';

@Component({
  selector: 'app-admin-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseEditComponent<Recipe> implements OnInit {

  imageStorageConfig: {model: string, alt: string};
  downloadURL: string;
  instructions: FormArray = new FormArray([]);
  ingredients: FormArray = new FormArray([]);
  preparations: FormArray = new FormArray([]);
  showAssociatedRecipes = false;
  selectedIngredient: Ingredient;

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected alertService: AlertService,
              protected recipeService: RecipeService,
              protected ingredientService: IngredientService,
              protected localizeRouterService: LocalizeRouterService,
              private contrastService: ContrastService) {
    super(activatedRoute, router, alertService, recipeService, localizeRouterService);
    this.createForm();
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.recipeService.getRecipe(key)
          .subscribe((document: Recipe) => {
            this.document = document;
            this.createForm();
            if (this.form.get('associated_recipes').value.length > 0) {
              this.showAssociatedRecipes = true;
            }
            this.createImageStorageConfig();
          });
      }
    });
  }

  createImageStorageConfig() {
    this.imageStorageConfig = {
      model: this.document.key,
      alt: this.document.name,
    };
  }

  /**
   * image change function of emitter
   */
  onImageChange(media: Media) {
    if (this.form) {
      this.form.patchValue({image: media.key});
      if (this.form.get('image')) {
        this.form.get('image').markAsTouched();
      }
      this.form.markAsTouched();
      this.alertService.toast('admin.recipe.image.saved');
    }
  }

  onImageRefChanged(task: UploadTaskSnapshot) {
    task.ref.getDownloadURL().then((downloadURL => {
        this.downloadURL = downloadURL;
      }),
      (err) => {
        this.alertService.show(err);
      });
  }

  createForm() {
    const formType = new RecipeFormType(this.document);
    this.form = formType.getForm();
    this.instructions = this.form.get('instructions') as FormArray;
  }

  addAssociatedRecipe() {
    this.showAssociatedRecipes = true;
  }

  addInstruction() {
    this.instructions = this.form.get('instructions') as FormArray;
    this.instructions.push(RecipeFormType.getInstruction(this.instructions.length + 1));
  }

  addIngredient(ingredient?: Ingredient) {
    this.ingredients = this.form.get('ingredients') as FormArray;
    this.ingredients.push(RecipeFormType.getIngredient(ingredient));
    this.selectedIngredient = null;
  }

  addPreparation() {
    this.preparations = this.form.get('preparations') as FormArray;
    this.preparations.push(RecipeFormType.getPreparation());
  }

  onIngredientSelected(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }

  reset() {
    this.form.reset({
      name: '',
      slug: '',
      cuisine_type: '',
      cook_time: '01:00',
      prep_time: '01:00',
      total_time: '02:00',
      waiting_time: '00:00',
      creator: 'Anne-Lise',
      yield: 4,
      difficulty: 3,
      trick: '',
      color: '',
      overlay_color: '',
      image: '',
      rating: 0,
      instructions: [],
      preparations: [],
      ingredients: [],
      search_ingredients: [],
      associated_recipes: [],
    });
  }

  saveDocument() {
    const slug = StringService.slugify(this.form.get('name').value);
    this.form.patchValue({slug});

    if (this.form.valid) {
      this.document = {
        ...this.document, ...this.form.value,
        ...{search_ingredients: this.form.value.ingredients.map((i: Ingredient) => i.name)}
      } as Recipe;

      if ((this.document as Recipe).published === true) {
        (this.document as Recipe).published_at = new Date();
      }

      if (this.document.key) {
        this.updateDocument();
      } else {
        this.createDocument();
      }
    }
  }

  createDocument() {
    this.recipeService.createDocument(this.document)
      .then((doc: DocumentReference) => {
        this.document.key = doc.id;
        this.updateDocument();
      }, (err) => {
        this.alertService.show(`admin.recipe.error.create`, {error: err});
      });
  }

  updateDocument() {
    this.recipeService.updateDocument(this.document)
      .then(() => {
        this.updateIngredients();
        this.alertService.show(`admin.recipe.updated`, {name: this.document.name});
        this.reset();
        this.router.navigate([this.localizeRouterService.translateRoute('/admin'), 'recipe']);
      }, (err) => {
        this.alertService.show(`admin.recipe.error.update`, {error: err});
      });
  }

  updateIngredients() {
    this.document.ingredients.forEach((ingredient: Ingredient) => {
      if (typeof ingredient.recipes === 'undefined' || !ingredient.recipes) {
        ingredient.recipes = [];
      }
      if (!ingredient.recipes.includes(this.document.key)) {
        ingredient.recipes.push(this.document.key);
        this.updateIngredient(ingredient);
      }
    });
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredientService.updateIngredient(ingredient)
      .then(() => {
      }, () => {
      });
  }

  cancel() {
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'recipe'
      ]);
    });
  }

  /**
   * After Drop Item in new order index
   */
  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir: number = event.currentIndex > event.previousIndex ? 1 : -1;

    const from: number = event.previousIndex;
    const to: number = event.currentIndex;

    const temp: AbstractControl = (this.form.get('instructions') as FormArray).at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current: AbstractControl = (this.form.get('instructions') as FormArray).at(i + dir);
      current.patchValue({order_index: i + 1});
      (this.form.get('instructions') as FormArray).setControl(i, current);
    }
    temp.patchValue({order_index: to + 1});
    (this.form.get('instructions') as FormArray).setControl(to, temp);
  }

  removeAssociatedRecipe() {
    this.showAssociatedRecipes = false;
  }

  removeIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  removeInstruction(index: number) {
    (this.form.get('instructions') as FormArray).removeAt(index);
  }

  removePreparation(index: number) {
    (this.form.get('preparations') as FormArray).removeAt(index);
  }

  get color() {
    return this.form.get('color').value;
  }

  set color(color: string) {
    this.form.patchValue({color, overlay_color: this.contrastService.getOverlayColor(color)});
  }
}
