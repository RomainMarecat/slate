import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { VisitorService } from '../../firestore/visitor.service';
import { Cart, CartItem } from './cart';
import { Product } from '../../product/shared/product';
import { User } from '../../user/shared/user';
import { tap, timeout } from 'rxjs/operators';

@Injectable()
export class CartService extends VisitorService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  constructor(afs: AngularFirestore, @Inject('TABLE_CART') table: string) {
    super(afs, table);
  }

  createCartObject(user: User): Cart {
    return {
      key: null,
      status: 'current',
      state: 'cart',
      items: [],
      total: 0,
      created_at: new Date(),
      updated_at: new Date(),
      user: user.uid
    };
  }

  createItemObject(product: Product, quantity: number): CartItem {
    return {
      name: product.name,
      code: product.key,
      quantity: quantity,
      image: product.image1,
      price: product.price,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  processItem(cart: Cart, item: CartItem): Cart {
    if (this.cart$.getValue()) {
      const existingCart: Cart = this.cart$.getValue();

      cart.key = existingCart.key;
      cart.created_at = existingCart.created_at;
      cart.items = [...existingCart.items];
      cart.total = 0;
      cart = this.updateItems(cart, item);

      if (cart && cart.items && cart.items.length === 0) {
        cart.items.push(item);
        cart.total += item.price * item.quantity;
      }
    }

    return cart;
  }

  updateItems(cart: Cart, item: CartItem): Cart {
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

    return cart;
  }

  saveCart(cart: Cart): Observable<Cart> {
    return new Observable<Cart>(observer => {
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

  addToCart(product: Product, user: User, quantity: number = 1): Observable<Cart> {
    let cart: Cart = this.createCartObject(user);
    const item: CartItem = this.createItemObject(product, quantity);
    cart = this.processItem(cart, item);
    return this.saveCart(cart);
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
