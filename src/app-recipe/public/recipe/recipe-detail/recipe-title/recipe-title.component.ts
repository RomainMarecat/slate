import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe';
import { Instruction } from '../../../instruction/shared/instruction';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-title',
  templateUrl: './recipe-title.component.html',
  styleUrls: ['./recipe-title.component.scss'],
  animations: [
    trigger('stepperAnimation', [
      state('show', style({
      })),
      state('hide', style({
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class RecipeTitleComponent implements OnInit {

  @Input() recipe: Recipe;

  @Input() showStepper: boolean;

  @Input() steps: Instruction[];

  constructor() { }

  ngOnInit() {
  }

}
