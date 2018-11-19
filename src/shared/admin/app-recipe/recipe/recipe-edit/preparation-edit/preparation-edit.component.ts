import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Preparation } from '../../../../../../app-recipe/public/preparation/shared/preparation';
import { Ingredient } from '../../../../../../app-recipe/public/ingredient/shared/ingredient';

@Component({
  selector: 'app-admin-recipe-preparation-edit',
  templateUrl: './preparation-edit.component.html',
  styleUrls: ['./preparation-edit.component.scss']
})
export class PreparationEditComponent implements OnInit {

  preparations: Preparation[] = [];

  @Input() ingredients: Ingredient[] = [];

  _form: FormGroup;

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    if (this.form) {
      this.form.valueChanges.subscribe((v) => {
        console.log(v);
      });
    }
  }

  addQuantity() {
    this.form.patchValue({sentence: `${this.form.get('sentence').value}{{quantity}}`});
  }

  addIngredient() {
    this.form.patchValue({sentence: `${this.form.get('sentence').value}{{ingredient}}`});
  }

  updateIngredient(ingredient: Ingredient) {
    this.form.patchValue({ingredient: ingredient});
  }

  removeItem() {
    this.removed.emit(1);
  }

  @Input() set form(form: FormGroup) {
    this._form = form;
  }

  get form(): FormGroup {
    return this._form;
  }

}
