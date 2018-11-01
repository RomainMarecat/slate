import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ingredients: Array<string>;
  form: FormGroup;
  @ViewChild('inputIngredient') inputIngredient: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.ingredients = [];
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ingredient: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]]
    });
  }

  addIngredient() {
    if (this.form.valid) {
      this.ingredients.push(this.form.value.ingredient);
      this.inputIngredient.nativeElement.value = '';
    }
  }

  removeIngredient(ingredient: string) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

  searchRecipe() {
    if (this.ingredients.length > 0) {
      this.router.navigate(['recipes/ingredients', this.ingredients.join(',')]);
    } else {
      this.router.navigate(['recipes']);
    }
  }
}
