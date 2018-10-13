import { mockEvent } from './mock-event';
import { Event } from './event';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { of } from 'rxjs/internal/observable/of';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';

export class MockEventService {
  eventCollectionRef: AngularFirestoreCollection<Event>;
  events$: Observable<DocumentChangeAction<Event>[]>;
  event$: Observable<Event>;
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

  getEvents(): Observable<Array<Event>> {
    return of([mockEvent]);
  }
}
