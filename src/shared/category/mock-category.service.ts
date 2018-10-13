import { mockCategory } from './mock-category';
import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { Filter } from '../facet/filter/shared/filter';
import { of } from 'rxjs/internal/observable/of';

export class MockCategoryService {

  categoryCollectionRef: AngularFirestoreCollection<Category>;
  categories$: Observable<DocumentChangeAction<Category[]>[]>;
  category$: Observable<Category>;
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

  getCategories(): Observable<Array<Category>> {
    return of([mockCategory]);
  }

  getCategory(): Observable<Category> {
    return of(mockCategory);
  }
}
