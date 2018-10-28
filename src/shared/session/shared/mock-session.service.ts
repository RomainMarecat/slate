import { Observable, of } from 'rxjs';
import { Session } from './session';
import { mockSession, mockSessions } from './mock-session';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Filter } from '../../facet/filter/shared/filter';

export class MockSessionService {

  sessionCollectionRef: AngularFirestoreCollection<Session>;
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
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}]);
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
