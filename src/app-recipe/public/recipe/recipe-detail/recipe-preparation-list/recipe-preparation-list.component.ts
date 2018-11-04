import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe';
import { Preparation } from '../../../preparation/shared/preparation';

@Component({
  selector: 'app-recipe-preparation-list',
  templateUrl: './recipe-preparation-list.component.html',
  styleUrls: ['./recipe-preparation-list.component.scss']
})
export class RecipePreparationListComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Get sentence with quantity + ingredient value
   */
  getSentence(preparation: Preparation): string {
    return preparation.sentence
      .replace('{{quantity}}', preparation.quantity.toString(10))
      .replace('{{ingredient}}', preparation.ingredient.name);
  }
}
