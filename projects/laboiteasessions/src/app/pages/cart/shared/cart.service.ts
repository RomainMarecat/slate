import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../../../shared/store/app.state';
import { Cart, CartItem } from '../../../shared/interfaces/cart';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/interfaces/user';
import { Product } from '../../../shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  cartNumberItem = 0;
  private secureUrl = `${environment.middleware}/v1/secure/cart`;

  constructor(private store: Store<AppState>,
              private http: HttpClient) {
  }

  createCartObject(user: User): Cart {
    return {
      id: null,
      status: 'current',
      state: 'cart',
      items: [],
      total: 0,
      created_at: new Date(),
      updated_at: new Date(),
      user: user.id
    };
  }

  createItemObject(product: Product, quantity: number): CartItem {
    return {
      id: null,
      name: product.name,
      code: product.id,
      quantity,
      image: product.image1,
      price: product.price,
      created_at: new Date(),
      updated_at: new Date()
    };
  }

  processItem(cart: Cart, item: CartItem): Cart {
    if (this.cart$.getValue()) {
      const existingCart: Cart = this.cart$.getValue();

      cart.id = existingCart.id;
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
      if (!cart.id) {
        this.createCart(cart)
          .subscribe((doc) => {
            cart.id = doc.id;
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
    return this.http.get<Cart[]>(`${this.secureUrl}`);
  }

  getCart(key: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.secureUrl}/last`);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.secureUrl}`, cart);
  }

  /**
   * Observable from promise update Cart
   */
  updateCart(cart: Cart): Observable<void> {
    return this.http.put<void>(`${this.secureUrl}/${cart.id}`, cart);
  }

  deleteCart(cart: Cart): Observable<void> {
    return this.http.delete<void>(`${this.secureUrl}/${cart.id}`);

  }
}
