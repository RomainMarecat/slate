import { mockCategory, mockStoreCategories } from './mock-category';
import { Category } from './category';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Filter } from '../facet/filter/shared/filter';

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
    return of(mockStoreCategories);
  }

  getCategory(): Observable<Category> {
    return of(mockCategory);
  }
}
