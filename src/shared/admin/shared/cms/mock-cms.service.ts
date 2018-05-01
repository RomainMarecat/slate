import { Observable } from 'rxjs/Rx';
import { Cms } from './cms';
import { mockCms } from './mock-cms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AlertService } from '../../../popup/alert.service';

export class MockCmsService {
  cmsCollectionRef: AngularFirestoreCollection<Cms>;
  cms$: Observable<DocumentChangeAction[]>;
  publishedFilter$: BehaviorSubject<boolean | true>;
  nameFilters$: BehaviorSubject<string | null>;
  siteNameFilters$: BehaviorSubject<string | null>;
  keyFilters$: BehaviorSubject<string | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;

  constructor() {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.siteNameFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
  }


  getCmss(): Observable<Array<Cms>> {
    return Observable.of([ mockCms ]);
  }
}
