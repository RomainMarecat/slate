import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  payment$: BehaviorSubject<Payment> = new BehaviorSubject<Payment>(null);
  private secureUrl = `${environment.middleware}/v1/secure/payments`;

  constructor(private http: HttpClient) {
  }

  getStripeKey(): string {
    return 'stripKey';
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.secureUrl);
  }

  getPayment(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.secureUrl}/${id}`);
  }

  createPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.secureUrl, payment);
  }

  updatePayment(payment: Payment): Observable<void> {
    return this.http.put<void>(`${this.secureUrl}/${payment.id}`, payment);
  }

  deletePayment(payment: Payment) {
    return this.http.delete<void>(`${this.secureUrl}/${payment.id}`);
  }
}
