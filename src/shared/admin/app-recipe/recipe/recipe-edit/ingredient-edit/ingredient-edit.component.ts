import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-recipe-ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss']
})
export class IngredientEditComponent implements OnInit {

  _form: FormGroup;

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
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

  get color() {
    return this.form.get('color').value;
  }

  set color(color: string) {
    this.form.patchValue({color: color});
  }
}
