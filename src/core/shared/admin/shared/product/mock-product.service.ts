import { Observable } from 'rxjs/Rx';
import { ClothingProduct } from '../../../product/clothing-product';
import { mockProduct } from './mock-product';

export class MockProductService {
  getProducts(): Observable < Array < ClothingProduct >> {
    return Observable.of([mockProduct]);
  }
}
