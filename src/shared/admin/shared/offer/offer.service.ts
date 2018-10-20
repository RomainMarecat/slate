import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitorService } from './../../../firestore/visitor.service';
import { Offer } from './../../../offer/offer';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class OfferService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_OFFER') table: string) {
    super(afs, table);
  }

  getOffers(): Observable<Offer[]> {
    return <Observable<Offer[]>> super.getDocuments();
  }

  getOffer(key: string): Observable<Offer> {
    return <Observable<Offer> > super.getDocument(key);
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
