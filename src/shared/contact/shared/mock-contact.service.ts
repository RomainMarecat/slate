import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Filter } from '../../facet/filter/shared/filter';
import { Sort } from '../../facet/sort/shared/sort';
import { Contact } from './contact';
import { mockContact } from './mock-contact';

export class MockContactService {

  contactCollectionRef: AngularFirestoreCollection<Contact>;
  contacts$: Observable<DocumentChangeAction<Contact[]>[]>;
  contact$: Observable<Contact>;
  query$: BehaviorSubject<any>;
  filters$: BehaviorSubject<Filter[]>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | 'published_at'>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;

  contactSelected: BehaviorSubject<Contact> = new BehaviorSubject<Contact>(null);

  constructor() {
    this.query$ = new BehaviorSubject({filters: [{column: 'published', operator: '==', value: true}] as Filter[]});
    this.filters$ = new BehaviorSubject([{column: 'published', operator: '==', value: true}] as Filter[]);
    this.limit$ = new BehaviorSubject(100);
    this.orderBy$ = new BehaviorSubject({column: 'published_at', direction: 'desc'});
  }

  getContacts(): Observable<Array<Contact>> {
    return of([mockContact]);
  }
}
