import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { CmsDetail } from './cms-detail';

@Injectable()
export class CmsDetailService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CMS_DETAIL') table: string) {
    super(afs, table);
  }

  getCmsDetails(): Observable<CmsDetail[]> {
    return super.getDocuments() as Observable<CmsDetail[]>;
  }

  getCmsDetail(key: string): Observable<CmsDetail> {
    return super.getDocument(key) as Observable<CmsDetail>;
  }

  createCmsDetail(cmsDetail: CmsDetail): Promise<any> {
    return super.createDocument(cmsDetail);
  }

  updateCmsDetail(cmsDetail: CmsDetail) {
    return super.updateDocument(cmsDetail);
  }


  deleteCmsDetail(cmsDetail: CmsDetail) {
    return super.deleteDocument(cmsDetail);
  }
}
