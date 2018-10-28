import { mockSelection } from './mock-selection';
import { Selection } from './selection';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { CollectionReference, Query } from '@firebase/firestore-types';

export class MockSelectionService {
  selectionCollectionRef: AngularFirestoreCollection<Selection>;
  publishedFilter$: BehaviorSubject<boolean | true>;
  parentFilter$: BehaviorSubject<string | null>;
  levelFilter$: BehaviorSubject<number | null>;
  nameFilters$: BehaviorSubject<string | null>;
  keyFilters$: BehaviorSubject<string | null>;
  userFilter$: BehaviorSubject<string | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(true);
    this.parentFilter$ = new BehaviorSubject(null);
    this.levelFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }

  getSelections(): Observable<Array<Selection>> {
    return of([mockSelection]);
  }
}
