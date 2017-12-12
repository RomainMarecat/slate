import { Observable } from 'rxjs/Rx';
import { ClothingProduct } from '../../../../core/shared/product/clothing-product';
import { mockProduct } from './mock-product';

export class MockProductService {
  getProducts(): Observable < Array < ClothingProduct >> {
    return Observable.of([mockProduct]);
  }
}
