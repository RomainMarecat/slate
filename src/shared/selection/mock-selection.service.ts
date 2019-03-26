import { mockSelection } from './mock-selection';
import { Selection } from './selection';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { Filter } from '../facet/filter/shared/filter';

export class MockSelectionService {
  selectionCollectionRef: AngularFirestoreCollection<Selection>;
  selections$: Observable<DocumentChangeAction<Selection>[]>;
  selection$: Observable<Selection>;
  filters$: BehaviorSubject<Filter[]>;
  userFilter$: BehaviorSubject<string | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}]);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }

  getSelections(): Observable<Array<Selection>> {
    return of([mockSelection]);
  }
}
