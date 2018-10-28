import { Observable, of } from 'rxjs';
import { Payment } from './payment';
import { mockPayment } from './mock-payment';

export class MockPaymentService {
  getPayments(): Observable<Array<Payment>> {
    return of([mockPayment, mockPayment]);
  }
}
