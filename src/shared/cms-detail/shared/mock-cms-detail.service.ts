import { Observable } from 'rxjs';
import { CmsDetail } from './cms-detail';
import { mockCmsDetail } from './mock-cms-detail';
import { BehaviorSubject } from 'rxjs';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { of } from 'rxjs/internal/observable/of';

export class MockCmsDetailService {
  cmsDetailCollectionRef: AngularFirestoreCollection<CmsDetail>;
  cmsDetails$: Observable<DocumentChangeAction<CmsDetail[]>[]>;
  filters$: BehaviorSubject<Filter[] | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | null>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
  }

  getCmsDetails(): Observable<Array<CmsDetail>> {
    return of([mockCmsDetail]);
  }
}
