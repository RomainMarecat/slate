import { Observable } from 'rxjs/Observable';
import { Cart } from './cart';
import { of } from 'rxjs/observable/of';
import { mockCart } from './mock-cart';

export class MockCartService {

  getCarts(): Observable<Cart[]> {
    return of([mockCart]);
  }

  getCart(key: string): Observable<Cart> {
    return of(mockCart);
  }
}
