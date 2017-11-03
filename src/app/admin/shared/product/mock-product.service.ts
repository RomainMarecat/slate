import { Observable } from 'rxjs/Rx';
import { IClothing } from './../../../shared/clothing/i-clothing';
import { mockProduct } from './mock-product';

export class MockProductService {
  getClothes(): Observable < Array < IClothing >> {
    return Observable.of([mockProduct]);
  }
}
