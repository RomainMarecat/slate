import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../shared/recipe';
import { Instruction } from '../../../instruction/shared/instruction';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-title',
  templateUrl: './recipe-title.component.html',
  styleUrls: ['./recipe-title.component.scss'],
  animations: [
    trigger('stepperAnimation', [
      state('show', style({})),
      state('hide', style({})),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class RecipeTitleComponent implements OnInit, AfterViewInit {

  @Input() recipe: Recipe;

  @Input() showStepper: boolean;

  @Input() steps: Instruction[];

  @Output() offsetHeightChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.offsetHeightChange.emit(this.element.nativeElement.offsetHeight);
    }, 500);
  }
}
