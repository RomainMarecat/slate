import { Observable } from 'rxjs/Rx';
import { CmsDetail } from './cms-detail';
import { mockCmsDetail } from './mock-cms-detail';

export class MockCmsDetailService {
  getCmsDetails(): Observable < Array < CmsDetail >> {
    return Observable.of([mockCmsDetail]);
  }
}
