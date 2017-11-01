import { Injectable } from '@angular/core';
import { Score } from './score';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';

@Injectable()
export class ScoreService {
  scoreCollectionRef: AngularFirestoreCollection < Score > ;
  scores$: Observable < DocumentChangeAction[] > ;
  userFilter$: BehaviorSubject < string | null > ;
  clothingFilter$: BehaviorSubject < string | null > ;
  scoreFilter$: BehaviorSubject < string | null > ;

  constructor(private afs: AngularFirestore) {
    this.scoreCollectionRef = this.afs.collection < Score > ('scores');
    this.userFilter$ = new BehaviorSubject(null);
    this.clothingFilter$ = new BehaviorSubject(null);
    this.scoreFilter$ = new BehaviorSubject(null);
    this.scores$ = Observable.combineLatest(
        this.userFilter$,
        this.clothingFilter$,
        this.scoreFilter$
      )
      .first()
      .switchMap(([user, clothing, score]) =>
        this.afs.collection('scores', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (user) {
            query = query.where('user', '==', user);
          }
          if (clothing) {
            query = query.where('clothing', '==', clothing);
          }
          if (score) {
            query = query.where('score', '==', score);
          }
          return query;
        }).snapshotChanges()
      );
  }

  filterByUser(user: string | null): Observable < Score[] > {
    this.userFilter$.next(user);
    return this.getUsers();
  }

  filterByClothing(clothing: string | null): Observable < Score[] > {
    this.clothingFilter$.next(clothing);
    return this.getUsers();
  }

  getUsers(): Observable < Score[] > {
    return this.scores$.map((scores: DocumentChangeAction[]) =>
      scores.map((doc: DocumentChangeAction) => {
        const score = doc.payload.doc.data() as Score;
        score.key = doc.payload.doc.id;
        return score;
      })
    );
  }

  isAuthorized(): Observable < boolean > {
    return this.getUsers().take(1).map((items: Score[]) => {
      return items.length === 0;
    });
  }

  createScore(score: Score) {
    this.scoreCollectionRef.add({ ...score });
  }
}
