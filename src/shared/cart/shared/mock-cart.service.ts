import { Observable } from 'rxjs/Observable';
import { Cart } from './cart';
import { of } from 'rxjs/observable/of';
import { mockCart } from './mock-cart';
import { Filter } from 'shared/facet/filter/shared/filter';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class MockCartService {

  sessionCollectionRef: AngularFirestoreCollection<Cart>;
  sessions$: Observable<DocumentChangeAction<Cart[]>[]>;
  session$: Observable<Cart>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}]);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }

  getCarts(): Observable<Cart[]> {
    return of([mockCart]);
  }

  getCart(key: string): Observable<Cart> {
    return of(mockCart);
  }
}
