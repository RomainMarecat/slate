import { Session } from '@romainmarecat/ngx-calendar';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { mockSessions } from './mock-session';

export class MockSessionService {
  sessionCollectionRef: AngularFirestoreCollection<Session>;
  sessions$: Observable<DocumentChangeAction<Session>[]>;
  session$: Observable<Session>;
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

  getSessions(): Observable<Array<Session>> {
    return of(mockSessions);
  }
}
