import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Order } from './order';
import { VisitorService } from '../../firestore/visitor.service';
import { timeout } from 'rxjs/operators';

@Injectable()
export class OrderService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_ORDER') table: string) {
    super(afs, table);
  }

  getOrders(): Observable<Order[]> {
    return <Observable<Order[]>>super.getDocuments();
  }

  getOrder(key: string): Observable<Order> {
    return super.getDocument(key) as Observable<Order>;
  }

  createOrder(order: Order): Observable<DocumentReference> {
    return from(super.createDocument(order))
      .pipe(
        timeout(5000)
      );
  }

  updateOrder(order: Order): Observable<void> {
    return from(super.updateDocument(order))
      .pipe(
        timeout(5000)
      );
  }


  deleteOrder(order: Order) {
    return super.deleteDocument(order);
  }
}
