import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import { VisitorService } from './../../../firestore/visitor.service';
import { Partner } from './../../../partner/partner';

@Injectable()
export class PartnerService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_NAME') table: string) {
    super(afs, table);
  }

  getPartners(): Observable < Partner[] > {
    console.log(this.table);
    return super.getDocuments() as Observable < Partner[] > ;
  }

  getPartner(key: string): Observable < Partner > {
    return super.getDocument(key) as Observable < Partner > ;
  }

  createPartner(partner: Partner): Promise < any > {
    return super.createDocument(partner);
  }

  updatePartner(partner: Partner) {
    return super.updateDocument(partner);
  }

  deletePartner(partner: Partner) {
    return super.deleteDocument(partner);
  }
}
