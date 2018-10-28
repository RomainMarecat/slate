import { mockAttribute } from './mock-attribute';
import { Attribute } from './attribute';
import { Observable, of } from 'rxjs';

export class MockAttributeService {

  constructor() {
  }

  getAttributes(): Observable<Array<Attribute>> {
    return of([mockAttribute]);
  }
}
