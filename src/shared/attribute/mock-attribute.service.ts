import { mockAttribute } from './mock-attribute';
import { Attribute } from './attribute';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

export class MockAttributeService {

  constructor() {
  }

  getAttributes(): Observable<Array<Attribute>> {
    return of([mockAttribute]);
  }
}
