import { Observable } from 'rxjs/Observable';
import { Payment } from './payment';
import { mockPayment } from './mock-payment';
import { of } from 'rxjs/internal/observable/of';

export class MockPaymentService {
  getPayments(): Observable<Array<Payment>> {
    return of([mockPayment, mockPayment]);
  }
}
