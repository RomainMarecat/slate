import { Observable } from 'rxjs/Rx';
import { mockProduct } from './mock-product';
import { Product } from '../../../product/product';

export class MockProductService {
  getProducts(): Observable < Array < Product >> {
    return Observable.of([mockProduct]);
  }

  getProduct(): Observable<Product> {
    return Observable.of(mockProduct);
  }
}
