import { BehaviorSubject, Observable, of } from 'rxjs';
import { mockShipping } from './mock-shipping';
import { Shipping } from './shipping';
import { Filter } from '../../facet/filter/shared/filter';
import { CollectionReference, Query } from '@angular/fire/firestore';

export class MockShippingService {
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
    this.filters$ = new BehaviorSubject([]);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('key');
  }

  getShippings(): Observable<Array<Shipping>> {
    return of([mockShipping]);
  }
}
