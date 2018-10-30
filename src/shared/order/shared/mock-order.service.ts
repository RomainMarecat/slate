import { Order } from './order';
import { mockOrder } from './mock-order';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestoreCollection, CollectionReference, DocumentChangeAction, DocumentReference, Query } from '@angular/fire/firestore';
import { Document } from '../../firestore/document';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';

export class MockOrderService {
  collectionRef: AngularFirestoreCollection<DocumentReference>;
  documents$: Observable<DocumentChangeAction<any>[]>;
  document$: Observable<Document>;
  query$: BehaviorSubject<any | null>;
  filters$: BehaviorSubject<Filter[] | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | null>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;
  table: string;

  constructor() {
    this.query$ = new BehaviorSubject(null);
    this.filters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
  }

  getOrders(): Observable<Array<Order>> {
    return of([mockOrder, mockOrder]);
  }
}
