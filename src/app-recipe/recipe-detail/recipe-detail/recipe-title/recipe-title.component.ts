import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Instruction } from '../../../instruction/shared/instruction';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatStepper } from '@angular/material';
import { Recipe } from '../../../recipe/shared/recipe';

@Component({
  selector: 'app-recipe-title',
  templateUrl: './recipe-title.component.html',
  styleUrls: ['./recipe-title.component.scss'],
  animations: [
    trigger('stepperAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-400px)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class RecipeTitleComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;

  _recipe: Recipe;

  @Input() showStepper: boolean;

  @Input() steps: Instruction[];

  @Output() offsetHeightChange: EventEmitter<number> = new EventEmitter<number>();

  _position = 0;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // + 10 rem OR menu 64px + information 288px
      this.offsetHeightChange.emit(this.element.nativeElement.offsetHeight + (this.showStepper ? 0 : 64 + 288));
    }, 100);
  }

  next() {
    if (this.stepper) {
      this.stepper.next();
    }
  }

  previous() {
    if (this.stepper) {
      this.stepper.previous();
    }
  }

  goToPosition() {
    if (this.stepper) {
      const difference: number = Math.abs(this.position - this.stepper.selectedIndex);
      let i = 0;
      while (i < difference) {
        if (this.position >= this.stepper.selectedIndex) {
          this.next();
        } else {
          this.previous();
        }
        i++;
      }
    }
  }

  @Input() set recipe(recipe: Recipe) {
    this._recipe = recipe;
  }

  get recipe(): Recipe {
    return this._recipe;
  }

  @Input() set position(position: number) {
    this._position = position;
    this.goToPosition();
  }

  get position(): number {
    return this._position;
  }
}
