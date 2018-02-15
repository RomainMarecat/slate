import { Observable } from 'rxjs/Rx';
import { Partner } from '../../../partner/partner';
import { mockPartner } from './mock-partner';

export class MockPartnerService {
  getPartners(): Observable < Array < Partner >> {
    return Observable.of([mockPartner, mockPartner]);
  }
}
