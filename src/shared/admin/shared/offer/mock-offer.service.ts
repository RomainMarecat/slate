import { Observable } from 'rxjs/Rx';
import { Offer } from '../../../offer/offer';
import { mockOffer } from './mock-offer';

export class MockOfferService {
  getOffers(): Observable<Array<Offer>> {
    return Observable.of([ mockOffer, mockOffer ]);
  }

  getOffer(): Observable<Offer> {
    return Observable.of(mockOffer);
  }
}
