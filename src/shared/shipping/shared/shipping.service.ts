import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Shipping } from './shipping';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShippingService extends VisitorService {

  shipping$: BehaviorSubject<Shipping> = new BehaviorSubject<Shipping>(null);

  constructor(afs: AngularFirestore,
              @Inject('TABLE_SHIPPING') table: string) {
    super(afs, table);
  }

  getShippings(): Observable<Shipping[]> {
    return super.getDocuments() as Observable<Shipping[]>;
  }

  getShipping(key: string): Observable<Shipping> {
    return super.getDocument(key) as Observable<Shipping>;
  }

  createShipping(shipping: Shipping): Observable<DocumentReference> {
    return from(super.createDocument(shipping))
      .pipe(
        timeout(5000)
      );
  }

  updateShipping(shipping: Shipping): Observable<void> {
    return from(super.updateDocument(shipping))
      .pipe(
        timeout(5000)
      );
  }

  deleteShipping(shipping: Shipping) {
    return super.deleteDocument(shipping);
  }
}
