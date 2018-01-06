import { Injectable } from '@angular/core';
import { CmsDetail } from './cms-detail';
import { AlertService } from '../../../popup/alert.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction } from 'angularfire2/firestore/interfaces';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';

@Injectable()
export class CmsDetailService {
  cmsDetailCollectionRef: AngularFirestoreCollection < CmsDetail > ;
  cmsDetails$: Observable < DocumentChangeAction[] > ;
  cmsFilters$: BehaviorSubject < string | null > ;
  nameFilters$: BehaviorSubject < string | null > ;
  keyFilters$: BehaviorSubject < string | null > ;
  limit$: BehaviorSubject < number | null > ;
  startAt$: BehaviorSubject < string | null > ;
  startAfter$: BehaviorSubject < string | null > ;
  orderBy$: BehaviorSubject < string | 'published_at' > ;
  endAt$: BehaviorSubject < string | null > ;
  endBefore$: BehaviorSubject < string | null > ;
  query: firebase.firestore.CollectionReference | firebase.firestore.Query;

  /**
   *
   * @param {AngularFirestore} afs
   * @param {AlertService} alertService
   */
  constructor(private afs: AngularFirestore, private alertService: AlertService) {
    this.keyFilters$ = new BehaviorSubject(null);
    this.cmsFilters$ = new BehaviorSubject(null);
    this.nameFilters$ = new BehaviorSubject(null);
    this.limit$ = new BehaviorSubject(null);
    this.cmsDetailCollectionRef = this.afs.collection('cms-detail');
    this.cmsDetails$ = Observable.combineLatest(
        this.keyFilters$,
        this.cmsFilters$,
        this.nameFilters$,
        this.limit$
      )
      .catch(err => {
        console.error(err);
        return Observable.of([]);
      })
      .switchMap(([key, cms, name, limit]) =>
        this.afs.collection('cms-detail', ref => {
          this.query = ref;
          if (cms) {
            this.query = this.query.where('cms', '==', cms);
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
   * @returns Observable<CmsDetail[]>
   */
  getCmsDetails(): Observable < CmsDetail[] > {
    return this.cmsDetails$.map((categories: DocumentChangeAction[]) =>
      categories.map((doc: DocumentChangeAction) => {
        const cmsDetail = doc.payload.doc.data() as CmsDetail;
        cmsDetail.key = doc.payload.doc.id;
        return cmsDetail as CmsDetail;
      })
    );
  }

  getCmsDetailByCms(cms: string): Observable < CmsDetail[] > {
    this.cmsFilters$.next(cms);
    return this.getCmsDetails();
  }

  /**
   *
   * @param string key
   * @returns Observable<cmsDetail[]>
   */
  getCmsDetail(key: null | string): Observable < CmsDetail[] > {
    this.keyFilters$.next(key);
    return this.getCmsDetails().take(1);
  }

  /**
   *
   * @param CmsDetail cmsDetail
   */
  updateCmsDetail(cmsDetail: CmsDetail) {
    this.cmsDetailCollectionRef.doc(cmsDetail.key).update({ ...cmsDetail });
  }

  /**
   *
   * @param CmsDetail cmsDetail
   */
  createCmsDetail(cmsDetail: CmsDetail) {
    delete cmsDetail.key;
    this.cmsDetailCollectionRef.add({ ...cmsDetail });
  }

  /**
   *
   * @param CmsDetail cmsDetail
   */
  deleteCmsDetail(cmsDetail: CmsDetail) {
    this.cmsDetailCollectionRef.doc(cmsDetail.key).delete();
  }
}
