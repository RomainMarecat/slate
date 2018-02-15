import { Injectable } from '@angular/core';
import { Score } from './score';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/first';

@Injectable()
export class ScoreService {
  scoreCollectionRef: AngularFirestoreCollection < Score > ;
  scores$: Observable < DocumentChangeAction[] > ;
  userFilter$: BehaviorSubject < string | null > ;
  productFilter$: BehaviorSubject < string | null > ;
  scoreFilter$: BehaviorSubject < string | null > ;

  /**
   *
   * @param {AngularFirestore} afs
   */
  constructor(private afs: AngularFirestore) {
    this.scoreCollectionRef = this.afs.collection < Score > ('scores');
    this.userFilter$ = new BehaviorSubject(null);
    this.productFilter$ = new BehaviorSubject(null);
    this.scoreFilter$ = new BehaviorSubject(null);
    this.scores$ = Observable.combineLatest(
        this.userFilter$,
        this.productFilter$,
        this.scoreFilter$
      )
      .first()
      .switchMap(([user, product, score]) =>
        this.afs.collection('scores', ref => {
          let query: CollectionReference | Query = ref;
          if (user) {
            query = query.where('user', '==', user);
          }
          if (product) {
            query = query.where('product', '==', product);
          }
          if (score) {
            query = query.where('score', '==', score);
          }
          return query;
        }).snapshotChanges()
      );
  }

  /**
   *
   * @param {string} user
   * @returns {Observable<Score[]>}
   */
  filterByUser(user: string | null): Observable < Score[] > {
    this.userFilter$.next(user);
    return this.getUsers();
  }

  /**
   *
   * @param {string} product
   * @returns {Observable<Score[]>}
   */
  filterByProduct(product: string | null): Observable < Score[] > {
    this.productFilter$.next(product);
    return this.getUsers();
  }

  /**
   *
   * @returns {Observable<Score[]>}
   */
  getUsers(): Observable < Score[] > {
    return this.scores$.map((scores: DocumentChangeAction[]) =>
      scores.map((doc: DocumentChangeAction) => {
        const score = doc.payload.doc.data() as Score;
        score.key = doc.payload.doc.id;
        return score;
      })
    );
  }

  /**
   *
   * @returns {Observable<boolean>}
   */
  isAuthorized(): Observable < boolean > {
    return this.getUsers().take(1).map((items: Score[]) => {
      return items.length === 0;
    });
  }

  /**
   *
   * @param {Score} score
   */
  createScore(score: Score) {
    this.scoreCollectionRef.add({ ...score });
  }
}
