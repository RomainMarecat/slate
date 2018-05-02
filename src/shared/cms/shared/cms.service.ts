import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
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
