import { Injectable, Inject } from '@angular/core';
import { Selection } from './selection';
import { AlertService } from '../alert/alert.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Reference, Action } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class SelectionService {
  selectionCollectionRef: AngularFirestoreCollection < Selection > ;
  selections$: Observable < DocumentChangeAction[] > ;
  selection$: Observable < any > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  levelFilter$: BehaviorSubject < number | null > ;
  nameFilters$: BehaviorSubject < string | null > ;
  parentFilter$: BehaviorSubject < string | null > ;
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
    this.levelFilter$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.parentFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.selectionCollectionRef = this.afs.collection('selection');
    this.selections$ = Observable.combineLatest(
        this.levelFilter$,
        this.publishedFilter$,
        this.nameFilters$,
        this.parentFilter$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([level, published, name, parent, limit]) =>
        this.afs.collection('selection', ref => {
          this.query = ref;
          if (level) {
            this.query = this.query.where('level', '==', level);
          }
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

  getDocumentSelection(path: string): Observable < Selection > {
    return this.selection$ = this.selectionCollectionRef
      .doc(path)
      .snapshotChanges()
      .map((action: Action < firebase.firestore.DocumentSnapshot > ) => {
        const selection = action.payload.data() as Selection;
        selection.key = action.payload.id;
        return selection as Selection;
      });
  }

  /**
   *
   * @param {string} key
   * @returns {Observable<Selection[]>}
   */
  getSelection(key: null | string): Observable < Selection > {
    if (key) {
      return this.getDocumentSelection(key);
    }
    return Observable.of(null);
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
