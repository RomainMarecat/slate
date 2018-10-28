import { Observable, of } from 'rxjs';
import { Offer } from '../../../offer/offer';
import { mockOffer } from './mock-offer';

export class MockOfferService {
  getOffers(): Observable<Array<Offer>> {
    return of([mockOffer, mockOffer]);
  }

  getOffer(): Observable<Offer> {
    return of(mockOffer);
  }
}
