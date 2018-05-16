import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { VisitorService } from '../../firestore/visitor.service';
import { Cart } from './cart';

@Injectable()
export class CartService extends VisitorService {

  constructor(afs: AngularFirestore, @Inject('TABLE_CART') table: string) {
    super(afs, table);
  }

  getCarts(): Observable<Cart[]> {
    return super.getDocuments() as Observable<Cart[]>;
  }

  getCart(key: string): Observable<Cart> {
    return super.getDocument(key) as Observable<Cart>;
  }

  createCart(cart: Cart): Promise<any> {
    return super.createDocument(cart);
  }

  updateCart(cart: Cart) {
    return super.updateDocument(cart);
  }

  deleteCart(cart: Cart) {
    return super.deleteDocument(cart);
  }
}
