import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cart } from './cart';
import { mockCart } from './mock-cart';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Filter } from '../../facet/filter/shared/filter';

export class MockCartService {

  sessionCollectionRef: AngularFirestoreCollection<Cart>;
  sessions$: Observable<DocumentChangeAction<Cart[]>[]>;
  session$: Observable<Cart>;
  query$: BehaviorSubject<any | null>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(mockCart);

  constructor() {
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}]);
    this.query$ = new BehaviorSubject({orderBy: [{column: 'published', operator: '==', value: true}]});
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
