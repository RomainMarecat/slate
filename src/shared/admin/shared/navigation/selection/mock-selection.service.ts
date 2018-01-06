import { mockSelection } from '../../../../selection/mock-selection';
import { Selection } from '../../../../selection/selection';
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

export class MockSelectionService {
  selectionCollectionRef: AngularFirestoreCollection < Selection > ;
  selections$: Observable < DocumentChangeAction[] > ;
  parentFilter$: BehaviorSubject < string | null > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
  colorFilter$: BehaviorSubject < string | null > ;
  userFilter$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;

  constructor() {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(true);
    this.parentFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.colorFilter$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }

  getSelections(): Observable < Array < Selection >> {
    return Observable.of([mockSelection]);
  }
}
