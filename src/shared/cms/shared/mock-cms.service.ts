import { Observable } from 'rxjs/Rx';
import { Cms } from './cms';
import { mockCms } from './mock-cms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AlertService } from '../../popup/alert.service';
import { CmsDetail } from '../../cms-detail/shared/cms-detail';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { CollectionReference, Query } from '@firebase/firestore-types';

export class MockCmsService {
  cmsCollectionRef: AngularFirestoreCollection<CmsDetail>;
  cmms$: Observable<DocumentChangeAction[]>;
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


  getCmss(): Observable<Array<Cms>> {
    return Observable.of([ mockCms ]);
  }
}
