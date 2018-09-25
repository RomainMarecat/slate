import { Inject, Injectable } from '@angular/core';
import { Score } from './score';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../firestore/visitor.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ScoreService extends VisitorService {

  /**
   *
   * @param {AngularFirestore} afs
   * @param {string} table
   */
  constructor(afs: AngularFirestore, @Inject('TABLE_SCORE') table: string) {
    super(afs, table);
  }

  /**
   *
   * @returns {Observable<Score[]>}
   */
  getScores(): Observable<Score[]> {
    return super.getDocuments() as Observable<Score[]>;
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<Score>}
   */
  getScore(key: string): Observable<Score> {
    return super.getDocument(key) as Observable<Score>;
  }

  /**
   *
   * @param {Score} score
   * @returns {Promise<any>}
   */
  createScore(score: Score): Promise<any> {
    return super.createDocument(score);
  }

  /**
   *
   * @param {Score} score
   * @returns {Promise<void>}
   */
  updateScore(score: Score) {
    return super.updateDocument(score);
  }

  /**
   *
   * @param {Score} score
   */
  deleteScore(score: Score) {
    return super.deleteDocument(score);
  }

  /**
   *
   * @param {string} user
   * @returns {Observable<Score[]>}
   */
  filterByUser(user: string | null): Observable<Score[]> {
    this.filters$.next([{
      column: 'user',
      operator: '==',
      value: user
    }]);
    return this.getScores();
  }

  /**
   *
   * @param {string} product
   * @returns {Observable<Score[]>}
   */
  filterByProduct(product: string | null): Observable<Score[]> {
    this.filters$.next([{
      column: 'product',
      operator: '==',
      value: product
    }]);
    return this.getScores();
  }

  /**
   *
   * @returns {Observable<boolean>}
   */
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
