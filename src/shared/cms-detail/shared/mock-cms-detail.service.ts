import { Observable } from 'rxjs/Rx';
import { CmsDetail } from './cms-detail';
import { mockCmsDetail } from './mock-cms-detail';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { Inject } from '@angular/core';

export class MockCmsDetailService {
  cmsDetailCollectionRef: AngularFirestoreCollection<CmsDetail>;
  cmsDetails$: Observable<DocumentChangeAction[]>;
  filters$: BehaviorSubject < Filter[] | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < Sort | null > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.orderBy$ = new BehaviorSubject(null);
  }

  getCmsDetails(): Observable < Array < CmsDetail >> {
    return Observable.of([mockCmsDetail]);
  }
}
