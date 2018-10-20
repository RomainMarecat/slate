import { Inject, Injectable } from '@angular/core';
import { Score } from './score';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../firestore/visitor.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ScoreService extends VisitorService {
  constructor(afs: AngularFirestore, @Inject('TABLE_SCORE') table: string) {
    super(afs, table);
  }

  getScores(): Observable<Score[]> {
    return super.getDocuments() as Observable<Score[]>;
  }

  getScore(key: string): Observable<Score> {
    return super.getDocument(key) as Observable<Score>;
  }

  createScore(score: Score): Promise<any> {
    return super.createDocument(score);
  }

  updateScore(score: Score) {
    return super.updateDocument(score);
  }

  deleteScore(score: Score) {
    return super.deleteDocument(score);
  }

  filterByUser(user: string | null): Observable<Score[]> {
    this.filters$.next([{
      column: 'user',
      operator: '==',
      value: user
    }]);
    return this.getScores();
  }

  filterByProduct(product: string | null): Observable<Score[]> {
    this.filters$.next([{
      column: 'product',
      operator: '==',
      value: product
    }]);
    return this.getScores();
  }

  isAuthorized(): Observable<boolean> {
    return this.getScores()
      .pipe(
        take(1),
        map((items: Score[]) => {
          return items.length === 0;
        })
      );
  }
}
