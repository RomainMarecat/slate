import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Cart } from './cart';
import { Product } from 'shared/product/shared/product';

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
