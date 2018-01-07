import { mockAttribute } from './mock-attribute';
import { Attribute } from './attribute';
import { Observable } from 'rxjs/Observable';

export class MockAttributeService {

  constructor() {}

  getAttributes(): Observable < Array < Attribute >> {
    return Observable.of([mockAttribute]);
  }
}
