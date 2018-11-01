import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestoreCollection, CollectionReference, DocumentChangeAction, DocumentReference, Query } from '@angular/fire/firestore';
import { Recipe } from './recipe';
import { mockRecipe } from './mock-recipe';
import { Filter } from '../../../../shared/facet/filter/shared/filter';
import { Sort } from '../../../../shared/facet/sort/shared/sort';

export class MockRecipeService {
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

  getRecipes(): Observable<Array<Recipe>> {
    return of([mockRecipe, mockRecipe]);
  }
}
