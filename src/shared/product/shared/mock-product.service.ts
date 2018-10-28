import { mockProduct } from './mock-product';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Filter } from '../../facet/filter/shared/filter';

export class MockProductService {
  productCollectionRef: AngularFirestoreCollection<Product>;
  products$: Observable<DocumentChangeAction<Product>[]>;
  product$: Observable<Product>;
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

  getProducts(): Observable<Array<Product>> {
    return of([mockProduct]);
  }
}
