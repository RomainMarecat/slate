import { Observable } from 'rxjs/Observable';
import { Offer } from './offer';
import { mockOffer } from './mock-offer';
import { of } from 'rxjs/internal/observable/of';

export class MockOfferService {
  getOffers(): Observable<Array<Offer>> {
    return of([mockOffer, mockOffer]);
  }
}
