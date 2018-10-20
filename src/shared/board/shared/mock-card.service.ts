import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Filter } from 'shared/facet/filter/shared/filter';
import { of } from 'rxjs/internal/observable/of';
import { AngularFirestoreCollection, CollectionReference, DocumentChangeAction, Query } from '@angular/fire/firestore';
import { Sort } from 'shared/facet/sort/shared/sort';
import { Card } from './card';
import { mockCard } from './mock-card';

export class MockCardService {
  cardCollectionRef: AngularFirestoreCollection<Card>;
  cards$: Observable<DocumentChangeAction<Card>[]>;
  card$: Observable<Card>;
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

  getCards(): Observable<Array<Card>> {
    return of([mockCard]);
  }

  getCard(): Observable<Card> {
    return of(mockCard);
  }
}
