import { Inject, Injectable } from '@angular/core';
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
import { VisitorService } from '../../../firestore/visitor.service';
import { CmsDetail } from './cms-detail';

@Injectable()
export class CmsDetailService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CMS_DETAIL') table: string) {
    super(afs, table);
  }

  getCmsDetails(): Observable < CmsDetail[] > {
    return super.getDocuments() as Observable < CmsDetail[] > ;
}

  getCmsDetail(key: string): Observable < CmsDetail > {
    return super.getDocument(key) as Observable < CmsDetail > ;
}

  createCmsDetail(cmsDetail: CmsDetail): Promise < any > {
    return super.createDocument(cmsDetail);
}

  updateCmsDetail(cmsDetail: CmsDetail) {
    return super.updateDocument(cmsDetail);
  }


  deleteCmsDetail(cmsDetail: CmsDetail) {
    return super.deleteDocument(cmsDetail);
  }
