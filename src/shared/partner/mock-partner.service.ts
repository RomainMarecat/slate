import { Partner } from './partner';
import { mockPartner } from './mock-partner';
import { Observable, of } from 'rxjs';

export class MockPartnerService {
  getPartners(): Observable<Array<Partner>> {
    return of([mockPartner, mockPartner]);
  }
}
