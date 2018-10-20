import { Observable } from 'rxjs';
import { Offer } from '../../../offer/offer';
import { mockOffer } from './mock-offer';
import { of } from 'rxjs/internal/observable/of';

export class MockOfferService {
  getOffers(): Observable<Array<Offer>> {
    return of([mockOffer, mockOffer]);
  }

  getOffer(): Observable<Offer> {
    return of(mockOffer);
  }
}
