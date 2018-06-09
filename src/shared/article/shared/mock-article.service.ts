import { mockArticle } from './mock-article';
import { Article } from './article';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { of } from 'rxjs/internal/observable/of';

export class MockArticleService {

  articleCollectionRef: AngularFirestoreCollection<Article>;
  articles$: Observable<DocumentChangeAction<Article[]>[]>;
  article$: Observable<Article>;
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

  getArticles(): Observable<Array<Article>> {
    return of([mockArticle]);
  }
}
