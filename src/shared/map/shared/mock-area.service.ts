import { Observable } from 'rxjs/Observable';
import { Area } from './area';
import { mockAreas } from './mock-area';
import { AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Filter } from '../../facet/filter/shared/filter';

export class MockAreaService {
  areaCollectionRef: AngularFirestoreCollection < Area > ;
  areas$: Observable < DocumentChangeAction[] > ;
  area$: Observable < Area > ;
  filters$: BehaviorSubject < Filter[] > ;
  userFilter$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: CollectionReference | Query;

  constructor() {
    this.filters$ = new BehaviorSubject([{ column: 'published', operator: '==', value: true }]);
    this.userFilter$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(20);
    this.orderBy$ = new BehaviorSubject('published_at');
  }

  getAreas(): Observable<Area[]> {
    return Observable.of(mockAreas);
  }
}
