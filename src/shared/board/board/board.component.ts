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
import { ObjectService } from 'shared/util/object.service';
import { AlertService } from 'shared/popup/alert.service';

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

  /**
   *
   * @param {DragulaService} dragulaService
   * @param {ElementRef} el
   * @param {BoardService} boardService
   * @param {ColumnService} columnService
   * @param {CardService} cardService
   * @param objectService
   * @param alertService
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @param {Title} title
   */
  constructor(private dragulaService: DragulaService,
              public el: ElementRef,
              private boardService: BoardService,
              private columnService: ColumnService,
              private cardService: CardService,
              private objectService: ObjectService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    this.getBoard();
  }

  getBoard() {
    this.route.params.subscribe((value => {
      if (value.key) {
        this.boardService.getBoard(value.key)
          .subscribe(board => {
            this.board = board;
            this.columnService.filters$.next([
              {
                column: 'boardId',
                operator: '==',
                value: board.key
              }
            ]);
            this.cardService.filters$.next([
              {
                column: 'boardId',
                operator: '==',
                value: board.key
              }
            ]);
            this.columnService.getColumns()
              .subscribe((columns) => {
                this.board.columns = this.objectService.bubbleSort(columns, 'order');
                this.cardService.getCards()
                  .subscribe((cards) => {
                    this.board.cards = this.objectService.bubbleSort(cards, 'order');
                    this.board.columns = this.board.columns.map(col => {
                      col.cards = this.board.cards.filter((c) => {
                        return c.columnId === col.key;
                      });
                      return col;
                    });

                  }, (err) => {
                    this.alertService.show(err);
                  });
              }, (err) => {
                this.alertService.show(err);
              });

            this.title.setTitle(this.board.title + ' | Generic Task Manager');
          });
      }
    }));
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
          this.alertService.show('updated board ' + this.board.title);
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

  updateColumnOrder() {
    this.board.columns.forEach((column, order) => {
      if (column.order !== (order + 1) * 1000) {
        column.order = (order + 1) * 1000;
        this.columnService.updateColumn(column)
          .then(() => {
            this.alertService.show(`column updated ${column.title}`);
          }, (err) => {
            this.alertService.show(err);
          });
      }
    });
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