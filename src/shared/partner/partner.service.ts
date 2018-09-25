import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from './../firestore/visitor.service';
import { Partner } from './partner';

@Injectable()
export class PartnerService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_PARTNER') table: string) {
    super(afs, table);
  }

  getPartners(): Observable<Partner[]> {
    return super.getDocuments() as Observable<Partner[]>;
  }

  getPartner(key: string): Observable<Partner> {
    return super.getDocument(key) as Observable<Partner>;
  }

  createPartner(partner: Partner): Promise<any> {
    return super.createDocument(partner);
  }

  updatePartner(partner: Partner) {
    return super.updateDocument(partner);
  }

  deletePartner(partner: Partner) {
    return super.deleteDocument(partner);
  }
}
