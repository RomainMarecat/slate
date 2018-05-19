import { Observable } from 'rxjs/Rx';
import { Payment } from './payment';
import { mockPayment } from './mock-payment';

export class MockPaymentService {
  getPayments(): Observable<Array<Payment>> {
    return Observable.of([ mockPayment, mockPayment ]);
  }
}
