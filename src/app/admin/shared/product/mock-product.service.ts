import { Observable } from 'rxjs/Rx';
import { IProduct } from './../../../shared/product/i-product';
import { mockProduct } from './mock-product';

export class MockProductService {
  getProducts(): Observable < Array < IProduct >> {
    return Observable.of([mockProduct]);
  }
}
