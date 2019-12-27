import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mono } from '../../../shared/interfaces/mono';
import { Cart, MonoCart } from './cart';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartListService {
  monoCarts: Map<string, MonoCart>;

  buildMonoCartMap(cart: Cart) {
    const monoCarts: Map<string, MonoCart> = new Map<string, MonoCart>();
    cart.mono_carts.forEach(coach => {
      if (!coach.mono || !coach.mono.user_id) {
        return;
      }
      monoCarts.set(coach.mono.user_id, coach);
    });
    this.monoCarts = monoCarts;
  }

  /*****************************************************
   **************** Global cart actions *****************
   ******************************************************/

  getMonosCartsList(): Observable<Cart> {
    const cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    if (cart !== null && typeof cart !== 'undefined') {
      return of(cart);
    }
    return of({});
  }

  /*****************************************************
   ****************** Cart Mono actions *****************
   ******************************************************/
  getCartList(mono: Mono): Observable<Array<CartItem>> {
    const cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    this.buildMonoCartMap(cart);
    if (this.monoCarts && this.monoCarts.has(mono.user_id)) {
      return of(this.monoCarts.get(mono.user_id).cart_items);
    }
    return of([]);
  }

  addCartMono(mono: Mono): Observable<MonoCart> {
    let cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    if (cart === null) {
      cart = {mono_carts: []} as Cart;
    }
    const monoCart = {
      mono,
      cart_items: []
    };
    cart.mono_carts.push(monoCart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return of(monoCart);
  }

  deleteCartMono(mono: Mono): Observable<Cart> {
    const cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    if (cart === null) {
      return undefined;
    }
    const newMonosCarts = [];
    let monoCart;
    cart.mono_carts.forEach((coach) => {
      if (coach.mono && coach.mono.user_id
        && coach.mono.user_id === mono.user_id) {
        monoCart = coach;
        return;
      }
      newMonosCarts.push(coach);
    });


    cart.mono_carts = newMonosCarts;
    localStorage.setItem('cart', JSON.stringify(cart));
    return of(cart);
  }

  /*****************************************************
   **************** Cart item actions *******************
   ******************************************************/

  addCartItem(mono: Mono, cartItem: CartItem): Observable<Cart> {
    let cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    const monoCart: MonoCart = {
      mono,
      cart_items: [cartItem]
    };
    if (cart === null || !cart.mono_carts || cart.mono_carts.length <= 0) {
      cart = {mono_carts: []} as Cart;
      cart.mono_carts.push(monoCart);
    } else {
      let hasMono = false;
      cart.mono_carts.forEach((coach) => {
        if (coach.mono && coach.mono.user_id
          && coach.mono.user_id === mono.user_id) {
          coach.cart_items.push(cartItem);
          hasMono = true;
        }
      });

      if (!hasMono) {
        cart.mono_carts.push(monoCart);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    return of(cart);
  }

  deleteCartItem(mono: Mono, cartItem: CartItem): Observable<Cart> {
    const cart = JSON.parse(localStorage.getItem('cart')) as Cart;
    if (cart === null) {
      return undefined;
    }
    let monoCart: MonoCart;
    let j = 0;
    cart.mono_carts.forEach(coach => {
      if (coach.mono && coach.mono.user_id
        && coach.mono.user_id === mono.user_id
        && coach.cart_items && coach.cart_items.length > 0) {
        let idx = 0;
        coach.cart_items.forEach((item) => {
          const currSession = coach.cart_items[j].session;
          const itemSession = cartItem.session;
          if (currSession.start_date === itemSession.start_date
            && currSession.end_date === itemSession.end_date
            && currSession.start_time === itemSession.start_time
            && currSession.end_time === itemSession.end_time) {
            coach.cart_items.splice(idx, 1);
          }
          idx++;
        });
        monoCart = coach;
      }
      if (!coach.cart_items || coach.cart_items.length <= 0) {
        cart.mono_carts.splice(j, 1);
      } else {
        j++;
      }
    });


    localStorage.setItem('cart', JSON.stringify(cart));
    return of(cart);
  }
}
