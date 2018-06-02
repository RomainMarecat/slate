import { Partner } from './partner';
import { mockPartner } from './mock-partner';
import { Observable } from 'rxjs/Observable';

export class MockPartnerService {
  getPartners(): Observable<Array<Partner>> {
    return Observable.of([ mockPartner, mockPartner ]);
  }
}
