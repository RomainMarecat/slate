import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Preparation } from '../../../preparation/shared/preparation';
import { Recipe } from '../../../recipe/shared/recipe';

@Component({
  selector: 'app-recipe-preparation-list',
  templateUrl: './recipe-preparation-list.component.html',
  styleUrls: ['./recipe-preparation-list.component.scss']
})
export class RecipePreparationListComponent implements OnInit, AfterViewInit {

  @Input() recipe: Recipe;

  @Output() offsetHeightChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if ((this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight) > 0) {
      this.offsetHeightChange.emit(this.element.nativeElement.offsetTop + this.element.nativeElement.offsetHeight);
    }
  }

  /**
   * Get sentence with quantity + ingredient value
   */
  getSentence(preparation: Preparation): string {
    return preparation.sentence
      .replace('{{quantity}}', `<strong>${preparation.quantity.toString(10)}</strong>`)
      .replace('{{ingredient}}', `<strong>${preparation.ingredient.name}</strong>`);
  }
}
