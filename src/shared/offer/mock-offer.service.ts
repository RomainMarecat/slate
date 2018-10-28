import { Observable, of } from 'rxjs';
import { Offer } from './offer';
import { mockOffer } from './mock-offer';

export class MockOfferService {
  getOffers(): Observable<Array<Offer>> {
    return of([mockOffer, mockOffer]);
  }
}
