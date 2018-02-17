import { Injectable } from '@angular/core';
import { Cms } from './cms';
import { AlertService } from '../../../popup/alert.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

@Injectable()
export class CmsService {
  cmsCollectionRef: AngularFirestoreCollection < Cms > ;
  cms$: Observable < DocumentChangeAction[] > ;
  publishedFilter$: BehaviorSubject < boolean | true > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: CollectionReference | Query;

  /**
   *
   * @param {AngularFirestore} afs
   * @param {AlertService} alertService
   */
  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.publishedFilter$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.cmsCollectionRef = this.afs.collection('cms');
    this.cms$ = Observable.combineLatest(
        this.keyFilters$,
        this.publishedFilter$,
        this.nameFilters$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, published, name, limit]) =>
        this.afs.collection('cms', ref => {
          this.query = ref;
          if (published) {
            this.query = this.query.where('published', '==', published);
          }
          if (name) {
            this.query = this.query.where('name', '==', name);
          }
          if (limit) {
            this.query = this.query.limit(limit);
          }
          return this.query;
        })
        .snapshotChanges()
      );
  }

  /**
   *
   * @returns Observable<Cms[]>
   */
  getCmss(): Observable < Cms[] > {
    return this.cms$.map((categories: DocumentChangeAction[]) =>
      categories.map((doc: DocumentChangeAction) => {
        const cms = doc.payload.doc.data() as Cms;
        cms.key = doc.payload.doc.id;
        return cms as Cms;
      })
    );
  }

  /**
   *
   * @param string key
   * @returns Observable<cms[]>
   */
  getCms(key: null | string): Observable < Cms[] > {
    this.keyFilters$.next(key);
    return this.getCmss().take(1);
  }

  /**
   *
   * @param Cms cms
   */
  updateCms(cms: Cms) {
    this.cmsCollectionRef.doc(cms.key).update({ ...cms });
  }

  /**
   *
   * @param Cms cms
   */
  createCms(cms: Cms) {
    delete cms.key;
    this.cmsCollectionRef.add({ ...cms });
  }

  /**
   *
   * @param Cms cms
   */
  deleteCms(cms: Cms) {
    this.cmsCollectionRef.doc(cms.key).delete();
  }
}
