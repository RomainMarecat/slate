import { Partner } from './partner';
import { mockPartner } from './mock-partner';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

export class MockPartnerService {
  getPartners(): Observable<Array<Partner>> {
    return of([mockPartner, mockPartner]);
  }
}
