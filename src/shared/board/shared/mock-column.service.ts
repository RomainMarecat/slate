import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreCollection, CollectionReference, DocumentChangeAction, Query } from '@angular/fire/firestore';
import { Column } from './column';
import { mockColumn } from './mock-column';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';

export class MockColumnService {
  columnCollectionRef: AngularFirestoreCollection<Column>;
  columns$: Observable<DocumentChangeAction<Column>[]>;
  column$: Observable<Column>;
  query$: BehaviorSubject<any>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.query$ = new BehaviorSubject({filters: [{column: 'published', operator: '==', value: true}] as Filter[]});
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}] as Filter[]);
    this.limit$ = new BehaviorSubject(100);
    this.orderBy$ = new BehaviorSubject({column: 'published_at', direction: 'desc'});
  }

  getColumns(): Observable<Array<Column>> {
    return of([mockColumn]);
  }

  getColumn(): Observable<Column> {
    return of(mockColumn);
  }
}
