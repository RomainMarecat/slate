import { ClothingProduct } from './clothing-product';
import { mockProduct } from './mock-product';
import { Product } from './product';
import { AlertService } from '../popup/alert.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot, DocumentReference } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import { Filter } from './../facet/filter/shared/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

export class MockProductService {
  productCollectionRef: AngularFirestoreCollection < ClothingProduct > ;
  products$: Observable < DocumentChangeAction[] > ;
  product$: Observable < Product > ;
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

  getProducts(): Observable < Array < ClothingProduct >> {
    return Observable.of([mockProduct]);
  }
}
