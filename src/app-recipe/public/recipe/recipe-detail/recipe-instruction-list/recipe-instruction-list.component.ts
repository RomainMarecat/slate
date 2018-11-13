import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-recipe-instruction-list',
  templateUrl: './recipe-instruction-list.component.html',
  styleUrls: ['./recipe-instruction-list.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class RecipeInstructionListComponent implements OnInit {

  @Input() recipe: Recipe;

  state = 'show';

  constructor() {
  }

  ngOnInit() {

  }
}
