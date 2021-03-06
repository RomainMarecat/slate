import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from './board';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';

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
