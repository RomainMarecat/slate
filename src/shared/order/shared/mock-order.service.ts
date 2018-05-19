import { Observable } from 'rxjs/Rx';
import { Order } from './order';
import { mockOrder } from './mock-order';

export class MockOrderService {
  getOrders(): Observable < Array < Order >> {
    return Observable.of([mockOrder, mockOrder]);
  }
}
