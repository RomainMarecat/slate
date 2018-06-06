import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../shared/card';
import { Column } from '../shared/column';
import { ColumnService } from '../shared/column.service';
import { CardService } from '../shared/card.service';
import { DragulaService } from 'ng2-dragula';

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
              private dragulaService: DragulaService) {
  }

  ngOnInit() {
    this.subscribeDragAndDrop();
  }

  /**
   * Drag an drop system for attributes
   */
  subscribeDragAndDrop() {
    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    this.dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private onDropModel(args: any): void {
    const [el, target, source] = args;
  }

  private onRemoveModel(args: any): void {
    const [el, source] = args;
  }

  updateCardsOrder(event) {

    // for (i = 0; i < cardArr.length - 1; i++) {
    //   if (cardArr[ i ].getAttribute('card-id') === event.cardId) {
    //     break;
    //   }
    // }
    //
    // if (cardArr.length > 1) {
    //   if (i > 0 && i < cardArr.length - 1) {
    //     elBefore = +cardArr[ i - 1 ].getAttribute('card-order');
    //     elAfter = +cardArr[ i + 1 ].getAttribute('card-order');
    //
    //     newOrder = elBefore + ((elAfter - elBefore) / 2);
    //   }
    //   else if (i == cardArr.length - 1) {
    //     elBefore = +cardArr[ i - 1 ].getAttribute('card-order');
    //     newOrder = elBefore + 1000;
    //   } else if (i == 0) {
    //     elAfter = +cardArr[ i + 1 ].getAttribute('card-order');
    //
    //     newOrder = elAfter / 2;
    //   }
    // } else {
    //   newOrder = 1000;
    // }

    const card = this.cards.filter(x => x.key === event.cardId)[0];
    const oldColumnId = card.columnId;
    // card.order = newOrder;
    card.columnId = event.columnId;
    this.cardService.updateCard(card)
      .then(res => {
        console.log(res);
      });
  }

  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.updateColumn();
    } else if (event.keyCode === 27) {
      this.cleadAddColumn();
    }
  }

  addCard() {
    this.cards = this.cards || [];
    const card = <Card>{
      title: this.addCardText,
      order: (this.cards.length + 1) * 1000,
      columnId: this.column.key,
      boardId: this.column.boardId
    };
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
    if (event.keyCode === 13) {
      if (this.addCardText && this.addCardText.trim() !== '') {
        this.addCard();
        this.addCardText = '';
      } else {
        this.clearAddCard();
      }
    } else if (event.keyCode === 27) {
      this.clearAddCard();
    }
  }

  updateColumn() {
    if (this.column.title && this.column.title.trim() !== '') {
      this.columnService.updateColumn(this.column)
        .then(res => {
          console.log(res);
        });
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

    setTimeout(function () {
      input.focus();
    }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement
      .getElementsByClassName('add-card')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () {
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

  onCardUpdate(card: Card) {
    this.cardUpdate.emit(card);
  }
}
