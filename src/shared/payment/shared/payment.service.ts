import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Payment } from './payment';
import { timeout } from 'rxjs/operators';

@Injectable()
export class PaymentService extends VisitorService {

  payment$: BehaviorSubject<Payment> = new BehaviorSubject<Payment>(null);

  constructor(afs: AngularFirestore,
              @Inject('TABLE_CMS') table: string,
              @Inject('STRIPE_KEY') private stripeKey: string) {
    super(afs, table);
  }

  getStripeKey(): string {
    return this.stripeKey;
  }

  getPayments(): Observable<Payment[]> {
    return super.getDocuments() as Observable<Payment[]>;
  }

  getPayment(key: string): Observable<Payment> {
    return super.getDocument(key) as Observable<Payment>;
  }

  createPayment(payment: Payment): Observable<DocumentReference> {
    return from(super.createDocument(payment))
      .pipe(
        timeout(5000)
      );
  }

  updatePayment(payment: Payment): Observable<void> {
    return from(super.updateDocument(payment))
      .pipe(
        timeout(5000)
      );
  }

  deletePayment(payment: Payment) {
    return super.deleteDocument(payment);
  }
}
