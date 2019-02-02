import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../recipe/shared/recipe';

@Component({
  selector: 'app-recipe-information',
  templateUrl: './recipe-information.component.html',
  styleUrls: ['./recipe-information.component.scss']
})
export class RecipeInformationComponent implements OnInit {

  @Input() recipe: Recipe;

  @Input() stickyContent: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
