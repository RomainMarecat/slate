import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Delivery } from './delivery';
import { tap, timeout } from 'rxjs/operators';

@Injectable()
export class DeliveryService extends VisitorService {

  delivery$: BehaviorSubject<Delivery> = new BehaviorSubject<Delivery>(null);

  constructor(afs: AngularFirestore, @Inject('TABLE_DELIVERY') table: string) {
    super(afs, table);
  }

  getDeliveries(): Observable<Delivery[]> {
    return super.getDocuments() as Observable<Delivery[]>;
  }

  getDelivery(key: string): Observable<Delivery> {
    return super.getDocument(key) as Observable<Delivery>;
  }

  createDelivery(delivery: Delivery): Observable<DocumentReference> {
    return from(super.createDocument(delivery))
      .pipe(
        timeout(5000)
      );
  }

  /**
   * Observable from promise update Delivery
   */
  updateDelivery(delivery: Delivery): Observable<void> {
    return from(super.updateDocument(delivery))
      .pipe(
        timeout(5000),
        tap(() => {
          this.delivery$.next(delivery);
        })
      );
  }

  deleteDelivery(delivery: Delivery): Observable<void> {
    return from(super.deleteDocument(delivery))
      .pipe(
        timeout(5000)
      );
  }
}
