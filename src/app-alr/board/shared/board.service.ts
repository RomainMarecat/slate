import { Inject, Injectable } from '@angular/core';
import { VisitorService } from 'shared/firestore/visitor.service';
import { Observable } from 'rxjs/Observable';
import { Board } from './board';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_BOARD') table: string) {
    super(afs, table);
  }

  getBoards(): Observable<Board[]> {
    return super.getDocuments() as Observable<Board[]>;
  }

  getBoard(key: string): Observable<Board> {
    return super.getDocument(key) as Observable<Board>;
  }

  createBoard(board: Board): Promise<any> {
    return super.createDocument(board);
  }

  updateBoard(board: Board) {
    return super.updateDocument(board);
  }

  deleteBoard(board: Board) {
    return super.deleteDocument(board);
  }
}
