import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from '../../../shared/store/app.state';
import { DeleteCartMonoAction } from '../cart-list/action/cart-list.action';
import { Cart, MonoCart } from './cart';
import { CartMonoItem } from './cart-item';
import { selectCart } from './cart.selector';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  emitAddSessionSource = new Subject<any>();
  emitDeleteSessionSource = new Subject<any>();
  emitDeleteSessionSuccessSource = new Subject<any>();
  emitOpenCartSource = new Subject<any>();
  // Observable string streams
  addSessionEmitted$ = this.emitAddSessionSource.asObservable();
  deleteSessionEmitted$ = this.emitDeleteSessionSource.asObservable();
  openCartEmitted$ = this.emitOpenCartSource.asObservable();
  deleteSessionSuccessEmitted$ = this.emitDeleteSessionSuccessSource.asObservable();

  cart$ = this.store.select(selectCart);
  cart: Cart;
  cartNumberItem = 0;

  constructor(private store: Store<AppState>) {
    this.cart$
      .subscribe(cart => {
        this.cart = cart.cart;
        if (cart) {
          let itemsNumber = 0;
          for (const i in cart) {
            if (cart[i] && cart[i].cart_items && cart[i].cart_items.length > 0) {
              itemsNumber += cart[i].cart_items.length;
            }
          }
          this.cartNumberItem = itemsNumber;
        } else {
          this.cartNumberItem = 0;
        }
      });
  }

  emitAddSession(cartMonoItem: CartMonoItem) {
    this.emitAddSessionSource.next(cartMonoItem);
  }

  emitDeleteSession(cartMonoItem: CartMonoItem) {
    this.emitDeleteSessionSource.next(cartMonoItem);
  }

  emitDeleteSuccessSession(cartMonoItem: CartMonoItem) {
    this.emitDeleteSessionSuccessSource.next(cartMonoItem);
  }

  emitOpenCart() {
    this.emitOpenCartSource.next();
  }

  getCartItemNumber(): number {
    return this.cartNumberItem;
  }

  deleteMonoCart(userId: string) {
    for (const i in this.cart) {
      if (this.cart[i].mono && this.cart[i].mono.user_id === userId) {
        return this.store.dispatch(new DeleteCartMonoAction(this.cart[i].mono));
      }
    }
  }

  getMonoCart(userId: string): MonoCart {
    for (const i in this.cart) {
      if (this.cart[i].mono && this.cart[i].mono.user_id === userId) {
        return this.cart[i] as MonoCart;
      }
    }
    return null;
  }
}
