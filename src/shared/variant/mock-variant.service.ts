import { mockVariant } from './mock-variant';
import { Variant } from './variant';
import { Observable } from 'rxjs/Observable';

export class MockVariantService {

  constructor() {}

  getVariants(): Observable < Array < Variant >> {
    return Observable.of([mockVariant]);
  }
}
