import { Component, ElementRef, OnInit } from '@angular/core';
import { Board } from '../shared/board';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnService } from '../shared/column.service';
import { BoardService } from '../shared/board.service';
import { Column } from '../shared/column';
import { Card } from '../shared/card';
import { CardService } from '../shared/card.service';
import { Title } from '@angular/platform-browser';
import { ObjectService } from '../../util/object.service';
import { AlertService } from '../../popup/alert.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

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

  constructor(public el: ElementRef,
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

            this.getColumns();

            this.title.setTitle(this.board.title + ' | Generic Task Manager');
          });
      }
    }));
  }

  getColumns() {
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
      // if (e.target.id === 'main' || e.target.id === 'board-wrapper') {
      //  this.curDown = true;
      // }
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


  blurOnEnter(event) {
    if (event.key === 13) {
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

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.key === '13') {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    } else if (event.key === '27') {
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

  addCard(card: Card) {
    this.board.cards.push(card);
  }

  foreceUpdateCards() {
    const cards = JSON.stringify(this.board.cards);
    this.board.cards = JSON.parse(cards);
  }

  onCardUpdate(card: Card) {
    this.foreceUpdateCards();
  }
}
