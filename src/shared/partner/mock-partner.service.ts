import { Observable } from 'rxjs/Rx';
import { Partner } from './partner';
import { mockPartner } from './mock-partner';

export class MockPartnerService {
  getPartners(): Observable < Array < Partner >> {
    return Observable.of([mockPartner, mockPartner]);
  }
}
