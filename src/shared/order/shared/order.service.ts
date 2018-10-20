import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from './order';
import { VisitorService } from '../../firestore/visitor.service';

@Injectable()
export class OrderService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_ORDER') table: string) {
    super(afs, table);
  }

  getOrders(): Observable < Order[] > {
    return <Observable < Order[] > > super.getDocuments();
  }

  getOrder(key: string): Observable < Order > {
    return super.getDocument(key) as Observable < Order > ;
  }

  createOrder(order: Order): Promise < any > {
    return super.createDocument(order);
  }

  updateOrder(order: Order) {
    return super.updateDocument(order);
  }


  deleteOrder(order: Order) {
    return super.deleteDocument(order);
  }
}
