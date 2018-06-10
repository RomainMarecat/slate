import { Component, ElementRef, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Category } from 'shared/category/category';
import { mockGroupFamily } from 'shared/category/mock-category';
import { Board } from '../shared/board';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnService } from '../shared/column.service';
import { BoardService } from '../shared/board.service';
import { Column } from '../shared/column';
import { Card } from '../shared/card';
import { CardService } from '../shared/card.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: Board;
  addingColumn = false;
  addColumnText: string;
  editingTitle = false;
  currentTitle: string;
  boardWidth: number;
  columnsAdded = 0;
  curYPos = 0;
  curXPos = 0;
  curDown = false;
  options: any;

  // families: Array<{ name: string, categories: Category[] }> = [];

  /**
   *
   * @param {DragulaService} dragulaService
   * @param {ElementRef} el
   * @param {BoardService} boardService
   * @param {ColumnService} columnService
   * @param {CardService} cardService
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Title} title
   */
  constructor(private dragulaService: DragulaService,
              public el: ElementRef,
              private boardService: BoardService,
              private columnService: ColumnService,
              private cardService: CardService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
    this.options = {
      direction: 'horizontal',
      accepts: function (elem, target, source, sibling) {
        console.log(elem, target);
        return elem.classList.contains('sortable-column') && target.classList.contains('columns-wrapper') ||
          elem.classList.contains('card-item') && target.classList.contains('card-list');
        // elements can be dropped in any of the `containers` by default
      },
    };
  }

  ngOnInit() {
    this.getBoard();
    // this.families = mockGroupFamily;
    this.subscribeDragAndDrop();
  }

  getBoard() {
    this.route.params.subscribe((value => {
      if (value.key) {
        this.boardService.getBoard(value.key)
          .subscribe(board => {
            console.log(`joining board ${value.key}`);
            this.board = board;
            this.columnService.filters$.next([
              {
                column: 'boardId',
                operator: '==',
                value: board.key
              }
            ]);
            this.columnService.getColumns().subscribe((columns) => {
              this.board.columns = columns;
            });
            this.cardService.filters$.next([
              {
                column: 'boardId',
                operator: '==',
                value: board.key
              }
            ]);
            this.cardService.getCards().subscribe((cards) => {
              this.board.cards = cards;
            });


            this.title.setTitle(this.board.title + ' | Generic Task Manager');
          });
      }
    }));
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

  bindPane() {
    const el = document.getElementById('board-wrapper');
    el.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.curDown === true) {
        el.scrollLeft += (this.curXPos - e.pageX) * .25;
        el.scrollTop += (this.curYPos - e.pageY) * .25;
      }
    });

    el.addEventListener('mousedown', (e) => {
      if (e.srcElement.id === 'main' || e.srcElement.id === 'board-wrapper') {
        this.curDown = true;
      }
      this.curYPos = e.pageY;
      this.curXPos = e.pageX;
    });
    el.addEventListener('mouseup', (e) => {
      this.curDown = false;
    });
  }

  updateBoardWidth() {
    // this.boardWidth = ((this.board.columns.length + (this.columnsAdded > 0 ? 1 : 2)) * 280) + 10;
    this.boardWidth = ((this.board.columns.length + 1) * 280) + 10;

    if (this.boardWidth > document.body.scrollWidth) {
      document.getElementById('main').style.width = this.boardWidth + 'px';
    } else {
      document.getElementById('main').style.width = '100%';
    }

    if (this.columnsAdded > 0) {
      const wrapper = document.getElementById('board-wrapper');
      wrapper.scrollLeft = wrapper.scrollWidth;
    }

    this.columnsAdded++;
  }

  updateBoard() {
    if (this.board.title && this.board.title.trim() !== '') {
      this.boardService.updateBoard(this.board)
        .then(res => {
          console.log(res);
        });
    } else {
      this.board.title = this.currentTitle;
    }
    this.editingTitle = false;
    document.title = this.board.title + ' | Generic Task Manager';
  }

  editTitle() {
    this.currentTitle = this.board.title;
    this.editingTitle = true;

    const input = this.el.nativeElement
      .getElementsByClassName('board-title')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () {
      input.focus();
    }, 0);
  }

  updateColumnElements(column: Column) {
    // let columnArr = jQuery('#main .column');
    // let columnEl = jQuery('#main .column[columnid=' + column._id + ']');
    // let i = 0;
    // for (; i < columnArr.length - 1; i++) {
    //   column.order < +columnArr[ i ].getAttibute('column-order');
    //   break;
    // }

    // columnEl.remove().insertBefore(columnArr[ i ]);
  }

  updateColumnOrder(event) {
    // let i: number = 0,
    //   elBefore: number = -1,
    //   elAfter: number = -1,
    //   newOrder: number = 0,
    //   columnEl = jQuery('#main'),
    //   columnArr = columnEl.find('.column');
    //
    // for (i = 0; i < columnArr.length - 1; i++) {
    //   if (columnEl.find('.column')[ i ].getAttribute('column-id') == event.columnId) {
    //     break;
    //   }
    // }
    //
    // if (i > 0 && i < columnArr.length - 1) {
    //   elBefore = +columnArr[ i - 1 ].getAttribute('column-order');
    //   elAfter = +columnArr[ i + 1 ].getAttribute('column-order');
    //
    //   newOrder = elBefore + ((elAfter - elBefore) / 2);
    // } else if (i === columnArr.length - 1) {
    //   elBefore = +columnArr[ i - 1 ].getAttribute('column-order');
    //   newOrder = elBefore + 1000;
    // } else if (i === 0) {
    //   elAfter = +columnArr[ i + 1 ].getAttribute('column-order');
    //
    //   newOrder = elAfter / 2;
    // }
    //
    // const column = this.board.columns.filter(x => x.key === event.columnId)[ 0 ];
    // column.order = newOrder;
    // this.columnService.updateColumn(column)
    //   .then(res => {
    //     console.log(res);
    //   });
  }


  /**
   *
   * @param event
   */
  blurOnEnter(event) {
    if (event.keyCode === 13) {
      event.target.blur();
    }
  }

  enableAddColumn() {
    this.addingColumn = true;
    // const input = jQuery('.add-column')[ 0 ]
    //   .getElementsByTagName('input')[ 0 ];
    //
    // setTimeout(function () {
    //   input.focus();
    // }, 0);
  }

  addColumn() {
    const column = <Column>{
      title: this.addColumnText,
      order: (this.board.columns.length + 1) * 1000,
      boardId: this.board.key
    };
    this.columnService.createColumn(column)
      .then((doc) => {
        column.key = doc.id;
        this.columnService.updateColumn(column)
          .then(() => {
            this.board.columns.push(column);
            console.log('column added');
            this.updateBoardWidth();
            this.addColumnText = '';
          }, (err) => {
            console.error(err);
          });
      });
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    } else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }

  /**
   *
   * @param {Card} card
   */
  addCard(card: Card) {
    this.board.cards.push(card);
  }

  foreceUpdateCards() {
    const cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }

  /**
   *
   * @param {Card} card
   */
  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }
}
