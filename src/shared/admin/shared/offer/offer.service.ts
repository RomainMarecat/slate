import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DocumentChangeAction, Action } from 'angularfire2/firestore/interfaces';
import { CollectionReference, Query, DocumentSnapshot } from '@firebase/firestore-types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, switchMap, combineLatest, retry, timeout, catchError } from 'rxjs/operators';
import { VisitorService } from './../../../firestore/visitor.service';
import { Offer } from './../../../offer/offer';

@Injectable()
export class OfferService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_NAME') table: string) {
    super(afs, table);
  }

  getOffers(): Observable < Offer[] > {
    console.log(this.table);
    return super.getDocuments() as Observable < Offer[] > ;
  }

  getOffer(key: string): Observable < Offer > {
    return super.getDocument(key) as Observable < Offer > ;
  }

  createOffer(offer: Offer): Promise < any > {
    return super.createDocument(offer);
  }

  updateOffer(offer: Offer) {
    return super.updateDocument(offer);
  }

  deleteOffer(offer: Offer) {
    return super.deleteDocument(offer);
  }
}
