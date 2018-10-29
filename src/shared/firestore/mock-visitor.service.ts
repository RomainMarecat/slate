import { BehaviorSubject, Observable, of } from 'rxjs';
import { Document } from './document';
import {
  AngularFirestoreCollection,
  CollectionReference,
  DocumentChangeAction,
  DocumentReference,
  Query
} from '@angular/fire/firestore';
import { Filter } from '../facet/filter/shared/filter';
import { Sort } from '../facet/sort/shared/sort';

export class MockVisitorService {

  collectionRef: AngularFirestoreCollection<DocumentReference>;
  documents$: Observable<DocumentChangeAction<any>[]>;
  document$: Observable<Document>;
  query$: BehaviorSubject<any | null>;
  filters$: BehaviorSubject<Filter[] | null>;
  limit$: BehaviorSubject<number | null>;
  startAt$: BehaviorSubject<string | null>;
  startAfter$: BehaviorSubject<string | null>;
  orderBy$: BehaviorSubject<Sort | null>;
  endAt$: BehaviorSubject<string | null>;
  endBefore$: BehaviorSubject<string | null>;
  query: CollectionReference | Query;
  table: string;


  getDocuments(): Observable<Array<{}>> {
    return of([{}, {}]);
  }

  getDocument(): Observable<{}> {
    return of({});
  }

  updateDocument() {
    return of().toPromise();
  }

  createDocument() {
    return of({}).toPromise();
  }

  deleteDocument() {
    return;
  }
}
