import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../shared/card';
import { Column } from '../shared/column';
import { ColumnService } from '../shared/column.service';
import { CardService } from '../shared/card.service';
import { AlertService } from '../../popup/alert.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Input() cards: Card[];
  @Output() cardAdded: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() cardUpdate: EventEmitter<Card> = new EventEmitter<Card>();

  editingColumn = false;
  addingCard = false;
  addCardText: string;
  currentTitle: string;
  options: any;

  constructor(private el: ElementRef,
              private columnService: ColumnService,
              private cardService: CardService,
              private alertService: AlertService) {
    this.options = {
      direction: 'horizontal',
      revertOnSpill: false,
      accepts: (elem, target, source, sibling) => {
        return true;
        // return !source.classList.contains('card-item');
        // elem.classList.contains('sortable-column') && target.classList.contains('columns-wrapper') ||
        //   elem.classList.contains('card-item') && target.classList.contains('card-list');
        // elements can be dropped in any of the `containers` by default
      },
    };
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /**
   * On drop item in column
   */
  onDrop(args: any[]) {
    const [row, destination, source] = args;
    const rowColumnId: string = row.attributes.getNamedItem('card-id').value;
    const rowCardId: string = row.attributes.getNamedItem('card-id').value;
    const sourceColumnId: string = source.attributes.getNamedItem('column-id').value;
    const destinationColumnId: string = destination.attributes.getNamedItem('column-id').value;

    if (sourceColumnId === destinationColumnId ||
      !this.cards ||
      this.cards.length === 0) {
      return;
    }


    this.cards.forEach((c: Card) => {
      if (c.boardId === this.column.boardId &&
        destinationColumnId !== sourceColumnId &&
        rowCardId === c.key) {
        c.columnId = destinationColumnId;
        this.cardService.updateCard(c)
          .then(() => {
            this.alertService.show(`card updated ${c.title}`);
          }, (err) => {
            this.alertService.show(err);
          });
      }
    });
  }

  blurOnEnter(event) {
    if (event.key === 13) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.key === '13') {
      this.updateColumn();
    } else if (event.key === '27') {
      this.cleadAddColumn();
    }
  }

  addCard() {
    this.cards = this.cards || [];
    const card = {
      title: this.addCardText,
      order: (this.cards.length + 1) * 1000,
      columnId: this.column.key,
      boardId: this.column.boardId
    } as Card;
    this.cardService.createCard(card)
      .then((doc) => {
        card.key = doc.id;
        this.cardService.updateCard(card)
          .then(() => {
            this.cardAdded.emit(card);
          }, (err) => {
            console.error(err);
          });
      }, (err) => {
        console.error(err);
      });
  }

  addCardOnEnter(event: KeyboardEvent) {
    if (event.key === '13') {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
        return;
      }
      this.clearAddCard();
      return;
    }
    if (event.key === '27') {
      this.clearAddCard();
    }
  }

  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this.columnService.updateColumn(this.column)
        .then(() => this.alertService.show(`updated column ${this.column.title}`));
      this.editingColumn = false;
    } else {
      this.cleadAddColumn();
    }
  }

  cleadAddColumn() {
    this.column.title = this.currentTitle;
    this.editingColumn = false;
  }

  editColumn() {
    this.currentTitle = this.column.title;
    this.editingColumn = true;
    const input = this.el.nativeElement
      .getElementsByClassName('column-header')[0]
      .getElementsByTagName('input')[0];

    setTimeout(() => {
      input.focus();
    }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement
      .getElementsByClassName('add-card')[0]
      .getElementsByTagName('input')[0];

    setTimeout(() => {
      input.focus();
    }, 0);
  }


  updateColumnOnBlur() {
    if (this.editingColumn) {
      this.updateColumn();
      this.clearAddCard();
    }
  }


  addCardOnBlur() {
    if (this.addingCard) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
      }
    }
    this.clearAddCard();
  }

  clearAddCard() {
    this.addingCard = false;
    this.addCardText = '';
  }
}
