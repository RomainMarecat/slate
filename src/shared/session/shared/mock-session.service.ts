import { Observable } from 'rxjs/Observable';
import { Session } from './session';
import { of } from 'rxjs/observable/of';
import { mockSession, mockSessions } from './mock-session';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { Filter } from 'shared/facet/filter/shared/filter';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

export class MockSessionService {

  sessionCollectionRef: AngularFirestoreCollection<Session>;
  sessions$: Observable<DocumentChangeAction[]>;
  session$: Observable<Session>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<string | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject([ {column: 'published', operator: '==', value: true} ]);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }


  getSessions(): Observable<Session[]> {
    return of(mockSessions);
  }

  getSession(key: string): Observable<Session> {
    return of(mockSession);
  }

  createSession(session: Session): Promise<any> {
    return of(mockSession).toPromise();
  }
}
