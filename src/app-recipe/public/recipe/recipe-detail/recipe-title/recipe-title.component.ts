import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe';
import { Instruction } from '../../../instruction/shared/instruction';

@Component({
  selector: 'app-recipe-title',
  templateUrl: './recipe-title.component.html',
  styleUrls: ['./recipe-title.component.scss']
})
export class RecipeTitleComponent implements OnInit {

  @Input() recipe: Recipe;

  @Input() showStepper: boolean;

  @Input() steps: Instruction[];

  constructor() { }

  ngOnInit() {
  }

}
