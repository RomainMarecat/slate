import { Observable } from 'rxjs/Rx';
import { Cms } from './cms';
import { mockCms } from './mock-cms';

export class MockCmsService {
  getCmss(): Observable < Array < Cms >> {
    return Observable.of([mockCms]);
  }
}
