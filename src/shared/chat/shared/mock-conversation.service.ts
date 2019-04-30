import { AngularFirestoreCollection, CollectionReference, DocumentChangeAction, Query } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { Conversation } from './conversation';
import { mockConversation } from './mock-conversation';

export class MockConversationService {

  conversationCollectionRef: AngularFirestoreCollection<Conversation>;
  conversations$: Observable<DocumentChangeAction<Conversation[]>[]>;
  conversation$: Observable<Conversation>;
  query$: BehaviorSubject<any>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | 'created_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  constructor() {
    this.query$ = new BehaviorSubject({filters: [{column: 'created_at', operator: '==', value: true}] as Filter[]});
    this.filters$ = new BehaviorSubject([{column: 'created_at', operator: '==', value: true}] as Filter[]);
    this.limit$ = new BehaviorSubject(100);
    this.orderBy$ = new BehaviorSubject({column: 'created_at', direction: 'desc'});
  }

  getConversations(): Observable<Array<Conversation>> {
    return of([mockConversation]);
  }
}
