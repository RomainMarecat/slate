import { Injectable } from '@angular/core';
import { Selection } from './../../../../selection/selection';
import { AlertService } from '../../../../alert/alert.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Reference, Action } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';

@Injectable()
export class SelectionService {
  selectionCollectionRef: AngularFirestoreCollection < Selection > ;
  selectionDocumentRef: AngularFirestoreDocument < Selection > ;
  selections$: Observable < DocumentChangeAction[] > ;
  selection$: Observable < any > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  parentFilter$: BehaviorSubject < string | null > ;
  nameFilters$: BehaviorSubject < string | null > ;
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
  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.parentFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.selectionCollectionRef = this.afs.collection('selection');
    this.selections$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.parentFilter$,
        this.nameFilters$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, parent, name, limit]) => {
        return this.afs.collection('selection', ref => {
            this.query = ref;
            if (published) {
              this.query = this.query.where('published', '==', published);
            }
            if (parent) {
              this.query = this.query.where('parent', '==', parent);
            }
            if (name) {
              this.query = this.query.where('name', '==', name);
            }
            if (limit) {
              this.query = this.query.limit(limit);
            }
            return this.query;
          })
          .snapshotChanges();
      });
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
