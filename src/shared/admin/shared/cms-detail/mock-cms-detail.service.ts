import { Observable } from 'rxjs/Rx';
import { CmsDetail } from './cms-detail';
import { mockCmsDetail } from './mock-cms-detail';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export class MockCmsDetailService {
  cmsDetailCollectionRef: AngularFirestoreCollection<CmsDetail>;
  cmsDetails$: Observable<DocumentChangeAction[]>;
  cmsFilters$: BehaviorSubject<string | null>;
  nameFilters$: BehaviorSubject<string | null>;
  parentFilters$: BehaviorSubject<string | null>;
  keyFilters$: BehaviorSubject<string | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.keyFilters$ = new BehaviorSubject(null);
    this.cmsFilters$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.parentFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
  }

  getCmsDetails(): Observable < Array < CmsDetail >> {
    return Observable.of([mockCmsDetail]);
  }
}
