import { Order } from './order';
import { mockOrder } from './mock-order';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

export class MockOrderService {
  getOrders(): Observable < Array < Order >> {
    return of([mockOrder, mockOrder]);
  }
}
