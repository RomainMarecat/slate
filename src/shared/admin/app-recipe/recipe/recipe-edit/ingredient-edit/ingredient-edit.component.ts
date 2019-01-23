import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../../../../../app-recipe/public/ingredient/shared/ingredient';
import { DocumentReference } from '@angular/fire/firestore';
import { IngredientService } from '../../../../../../app-recipe/public/ingredient/shared/ingredient.service';
import { debounceTime } from 'rxjs/operators';
import { Recipe } from '../../../../../../app-recipe/public/recipe/shared/recipe';

@Component({
  selector: 'app-admin-recipe-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  @Input() recipe: Recipe;

  _form: FormGroup;

  subscription: Subscription;

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  isAutoSave: boolean;

  constructor(private ingredientService: IngredientService) {
    this.isAutoSave = false;
  }

  ngOnInit() {
  }

  removeItem() {
    this.removed.emit(1);
  }

  @Input() set form(form: FormGroup) {
    this._form = form;

    if (this.form) {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.form.valueChanges
        .subscribe((value) => {
          this.autoSaveIngredient(value);
        });
    }
  }


  autoSaveIngredient(ingredient: Ingredient) {

    if (this.isAutoSave === false && this.form.valid && ingredient.color && ingredient.name) {
      this.isAutoSave = true;
      if (this.recipe && this.recipe.key && !ingredient.recipes.includes(this.recipe.key)) {
        ingredient.recipes.push(this.recipe.key);
      }

      if (ingredient.key === '') {
        this.createIngredient(ingredient);
        return;
      }

      this.updateIngredient(ingredient);
    }
  }

  createIngredient(ingredient: Ingredient) {
    this.ingredientService.createIngredient(ingredient)
      .then((doc: DocumentReference) => {
        ingredient.key = doc.id;
        this.form.patchValue({key: ingredient.key});
        this.updateIngredient(ingredient);
      }, (err) => {
      });
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredientService.updateIngredient(ingredient)
      .then(() => {
        this.isAutoSave = false;
      }, (err) => {
        this.isAutoSave = false;
      });
  }


  get form(): FormGroup {
    return this._form;
  }

  set color(color: string) {
    this.form.patchValue({color: color});
  }
}