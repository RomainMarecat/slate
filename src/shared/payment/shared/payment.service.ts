import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Payment } from './payment';

@Injectable()
export class PaymentService extends VisitorService {

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

  createPayment(payment: Payment): Promise<any> {
    return super.createDocument(payment);
  }

  updatePayment(payment: Payment) {
    return super.updateDocument(payment);
  }

  deletePayment(payment: Payment) {
    return super.deleteDocument(payment);
  }
}
