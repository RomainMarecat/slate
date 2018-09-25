import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { VisitorService } from './../firestore/visitor.service';
import { Offer } from './offer';

@Injectable()
export class OfferService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_OFFER') table: string) {
    super(afs, table);
  }

  getOffers(): Observable<Offer[]> {
    return <Observable<Offer[]> > super.getDocuments();
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
