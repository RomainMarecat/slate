import { Observable } from 'rxjs/Rx';
import { IProduct } from '../../../../core/shared/product/i-product';
import { mockProduct } from './mock-product';

export class MockProductService {
  getProducts(): Observable < Array < IProduct >> {
    return Observable.of([mockProduct]);
  }
}
