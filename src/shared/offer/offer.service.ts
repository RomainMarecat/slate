import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from './../firestore/visitor.service';
import { Offer } from './offer';

@Injectable()
export class OfferService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_OFFER') table: string) {
    super(afs, table);
  }

  getOffers(): Observable<Offer[]> {
    return super.getDocuments() as Observable<Offer[]>;
  }

  getOffer(key: string): Observable<Offer> {
    return super.getDocument(key) as Observable<Offer>;
  }

  createOffer(offer: Offer): Promise<any> {
    return super.createDocument(offer);
  }

  updateOffer(offer: Offer) {
    return super.updateDocument(offer);
  }


  deleteOffer(offer: Offer) {
    return super.deleteDocument(offer);
  }
}
