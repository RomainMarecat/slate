import { Observable } from 'rxjs/Rx';
import { Category } from './category';
import { mockCategory } from './mock-category';

export class MockCategoryService {
  getCategories(): Observable < Array < Category >> {
    return Observable.of([mockCategory]);
  }
}
