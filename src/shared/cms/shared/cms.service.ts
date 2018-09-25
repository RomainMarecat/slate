import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Cms } from './cms';

@Injectable()
export class CmsService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CMS') table: string) {
    super(afs, table);
  }

  getCmss(): Observable<Cms[]> {
    return super.getDocuments() as Observable<Cms[]>;
  }

  getCms(key: string): Observable<Cms> {
    return super.getDocument(key) as Observable<Cms>;
  }

  createCms(cms: Cms): Promise<any> {
    return super.createDocument(cms);
  }

  updateCms(cms: Cms) {
    return super.updateDocument(cms);
  }


  deleteCms(cms: Cms) {
    return super.deleteDocument(cms);
  }
}
