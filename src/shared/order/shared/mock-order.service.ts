import { Order } from './order';
import { mockOrder } from './mock-order';
import { Observable, of } from 'rxjs';

export class MockOrderService {
  getOrders(): Observable < Array < Order >> {
    return of([mockOrder, mockOrder]);
  }
}
