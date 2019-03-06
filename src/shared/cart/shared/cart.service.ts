import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Cart, CartItem } from './cart';
import { Product } from '../../product/shared/product';
import { User } from '../../user/shared/user';
import { tap, timeout } from 'rxjs/operators';
import { time } from 'tns-core-modules/profiling';

@Injectable()
export class CartService extends VisitorService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  constructor(afs: AngularFirestore, @Inject('TABLE_CART') table: string) {
    super(afs, table);
  }

  addToCart(product: Product, user: User): Observable<Cart> {
    const cart: Cart = {
      key: null,
      status: 'current',
      state: 'cart',
      items: [],
      total: 0,
      created_at: new Date(),
      updated_at: new Date(),
      user: user.uid
    };
    const quantity = 1;

    const item: CartItem = {
      name: product.name,
      code: product.key,
      quantity: quantity,
      price: product.price,
      created_at: new Date(),
      updated_at: new Date()
    };
    if (this.cart$.getValue()) {
      const existingCart: Cart = this.cart$.getValue();

      cart.key = existingCart.key;
      cart.created_at = existingCart.created_at;
      cart.items = [...existingCart.items];
      cart.total = 0;
      let foundItem = false;
      cart.items.forEach((cartItem, index) => {
        if (cartItem.code === item.code) {
          foundItem = true;
          // update quantity
          cart.items[index].quantity += item.quantity;
          cartItem.quantity += item.quantity;
          // Security with erase old price in cart
          cart.items[index].price = item.price;
        }
        cart.total += cartItem.price * cartItem.quantity;
      });

      if (foundItem === false) {
        cart.items.push(item);
        cart.total += item.price * item.quantity;

      }

      if (cart && cart.items && cart.items.length === 0) {
        cart.items.push(item);
        cart.total += item.price * item.quantity;
      }
    }

    return new Observable(observer => {
      if (!cart.key) {
        this.createCart(cart)
          .subscribe((doc) => {
            cart.key = doc.id;
            this.updateCart(cart)
              .subscribe(() => {
                observer.next(cart);
              }, (err) => {
                observer.error(err);
              });
          }, (err) => {
            observer.error(err);
          });
        return;
      }
      this.updateCart(cart)
        .subscribe(() => {
          observer.next(cart);
        }, (err) => {
          observer.error(err);
        });

    });
  }

  getCarts(): Observable<Cart[]> {
    return super.getDocuments() as Observable<Cart[]>;
  }

  getCart(key: string): Observable<Cart> {
    return super.getDocument(key) as Observable<Cart>;
  }

  createCart(cart: Cart): Observable<DocumentReference> {
    return from(super.createDocument(cart))
      .pipe(
        timeout(5000)
      );
  }

  /**
   * Observable from promise update Cart
   */
  updateCart(cart: Cart): Observable<void> {
    return from(super.updateDocument(cart))
      .pipe(
        timeout(5000),
        tap(() => {
          this.cart$.next(cart);
        })
      );
  }

  deleteCart(cart: Cart): Observable<void> {
    return from(super.deleteDocument(cart))
      .pipe(
        timeout(5000)
      );
  }
}
