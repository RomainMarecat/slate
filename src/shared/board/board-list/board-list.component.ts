import { Component, OnInit } from '@angular/core';
import { Board } from '../shared/board';
import { BoardService } from '../shared/board.service';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  boards: Board[] = [];

  constructor(private boardService: BoardService,
              private router: Router,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.boardService.getBoards()
      .subscribe((boards: Board[]) => {
        this.boards = boards;
      });
    setTimeout(() => {
      document.getElementById('boards-wrapper').style.backgroundColor = '#fff';
    }, 100);
  }

  /**
   * Add new board
   */
  addBoard(): void {
    const board: Board = {
      title: 'New Board',
      columns: [],
      cards: []
    };
    console.log('Adding new board');
    this.boardService.createBoard(board)
      .then((doc) => {
        board.key = doc.id;
        this.boardService.updateBoard(board).then(() => {
          this.router.navigate([
            this.localizeRouterService.translateRoute('/board'),
            board.key
          ]);
          console.log('new board added');
        }, (err) => {
          console.error(err);
        });
      }, (err) => {
        console.error(err);
      });
  }

}
