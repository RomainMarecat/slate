import { Injectable, Inject } from '@angular/core';
import { Selection } from './selection';
import { AlertService } from '../alert/alert.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

@Injectable()
export class SelectionService {
  selectionCollectionRef: AngularFirestoreCollection < Selection > ;
  selections$: Observable < DocumentChangeAction[] > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  parentFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;

  /**
   *
   * @param {AngularFirestore} afs
   * @param {AlertService} alertService
   */
  constructor(private afs: AngularFirestore,
    @Inject('app_name') appName: string) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.parentFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.selectionCollectionRef = this.afs.collection('selection');
    this.selections$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.parentFilters$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, parent, limit]) =>
        this.afs.collection('selection', ref => {
          this.query = ref;
          if (published) {
            this.query = this.query.where('published', '==', published);
          }
          if (name) {
            this.query = this.query.where('name', '==', name);
          }
          if (parent) {
            this.query = this.query.where('parent', '==', parent);
          }
          if (limit) {
            this.query = this.query.limit(limit);
          }
          return this.query;
        })
        .snapshotChanges()
      );
  }

  /**
   *
   * @returns {Observable<Selection[]>}
   */
  getSelections(): Observable < Selection[] > {
    return this.selections$.map((selections: DocumentChangeAction[]) =>
      selections.map((doc: DocumentChangeAction) => {
        const selection = doc.payload.doc.data() as Selection;
        selection.key = doc.payload.doc.id;
        return selection as Selection;
      })
    );
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<Selection[]>}
   */
  getSelection(key: null | string): Observable < Selection[] > {
    this.keyFilters$.next(key);
    return this.getSelections().take(1);
  }

  /**
   *
   * @param {Selection} Selection
   */
  updateSelection(selection: Selection) {
    this.selectionCollectionRef.doc(selection.key).update({ ...selection });
  }

  /**
   *
   * @param {Selection} Selection
   */
  createSelection(selection: Selection) {
    delete selection.key;
    this.selectionCollectionRef.add({ ...selection });
  }

  /**
   *
   * @param {Selection} Selection
   */
  deleteSelection(selection: Selection) {
    this.selectionCollectionRef.doc(selection.key).delete();
  }
}
