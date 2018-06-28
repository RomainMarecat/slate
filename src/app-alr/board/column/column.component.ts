import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../shared/card';
import { Column } from '../shared/column';
import { ColumnService } from '../shared/column.service';
import { CardService } from '../shared/card.service';
import { DragulaService } from 'ng2-dragula';
import { AlertService } from 'shared/popup/alert.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './column.component.html',
  styleUrls: [ './column.component.scss' ]
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

  /**
   *
   * @param {ElementRef} el
   * @param {ColumnService} columnService
   * @param {CardService} cardService
   * @param alertService
   * @param {DragulaService} dragulaService
   */
  constructor(private el: ElementRef,
              private columnService: ColumnService,
              private cardService: CardService,
              private alertService: AlertService,
              private dragulaService: DragulaService) {
    this.options = {
      direction: 'horizontal',
      revertOnSpill: false,
      accepts: (elem, target, source, sibling) => {
        // console.log(elem, target);
        return true;
        // return !source.classList.contains('card-item');
        // elem.classList.contains('sortable-column') && target.classList.contains('columns-wrapper') ||
        //   elem.classList.contains('card-item') && target.classList.contains('card-list');
        // elements can be dropped in any of the `containers` by default
      },
    };
  }

  ngOnInit() {
    this.subscribeDragAndDrop();
  }

  /**
   * Drag an drop system for attributes
   */
  subscribeDragAndDrop() {
    this.dragulaService.dropModel.subscribe((value) => {
      const [el, target] = this.onDropModel(value.slice(1));
      this.updateCardsOrder(el, target);
    });
    this.dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private onDropModel(args: any) {
    const [ el, target, source ] = args;

    return [el, target];
  }

  private onRemoveModel(args: any) {
    const [ el, source ] = args;
  }

  updateCardsOrder(element: HTMLElement, target: HTMLElement) {
    this.cards.forEach((c: Card, index: number) => {
      if (c && c.order !== (index + 1) * 1000) {
        if (target.attributes.getNamedItem('column-id').value !== element.attributes.getNamedItem('column-id').value) {
          c.columnId = target.attributes.getNamedItem('column-id').value;
        }
        c.order = (index + 1) * 1000;
        this.cardService.updateCard(c)
          .then(() => {
            if (element.attributes.getNamedItem('card-id').value === c.key) {
              this.alertService.show(`card updated ${c.title}`);
            }
          }, (err) => {
            this.alertService.show(err);
          });
      }
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
      .getElementsByClassName('column-header')[ 0 ]
      .getElementsByTagName('input')[ 0 ];

    setTimeout(function () {
      input.focus();
    }, 0);
  }

  enableAddCard() {
    this.addingCard = true;
    const input = this.el.nativeElement
      .getElementsByClassName('add-card')[ 0 ]
      .getElementsByTagName('input')[ 0 ];

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
