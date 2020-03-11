import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Cart, CartItem } from '../interfaces/cart';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Product } from '../interfaces/product';
import { environment } from '../../../environments/environment';
import { FilterQuery, QueryService } from './query.service';
import { tap } from 'rxjs/operators';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(null);

  cartNumberItem = 0;

  filters$: BehaviorSubject<FilterQuery[]> = new BehaviorSubject<FilterQuery[]>([]);

  private secureUrl = `${environment.middleware}/v1/restricted/cart`;

  static containsOnlySessions(cart: Cart): boolean {
    let isOnlySessions = true;

    if (cart && cart.items && cart.items.length) {
      cart.items.forEach((item) => {
        if (typeof item.session === 'undefined') {
          isOnlySessions = false;
        }
      });
    }

    return isOnlySessions;
  }


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
      user
    };
  }

  createItemObject(product: Product, quantity: number): CartItem {
    return {
      id: null,
      name: product.name,
      code: product.id,
      quantity,
      product,
      session: null,
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

  validCart(cart: Cart): Observable<Cart> {
    cart = {
      ...cart,
      ...{
        items: cart.items.map(i => {
          return {
            ...i,
            ...{
              session: i.session.id,
              product: i.product.id
            }
          };
        })
      }
    } as unknown as Cart;
    return this.updateCart(cart);
  }

  addToCart(product: Product, session: Session, quantity: number = 1): Observable<Cart> {
    const cart: Cart = {
      items: [{
        id: null,
        name: product.name,
        code: product.id,
        price: null,
        session: session.id as unknown as Session,
        product: product.id as unknown as Product,
        quantity,
        created_at: null,
        updated_at: null
      }]
    } as unknown as Cart;

    return this.updateCart(cart);
  }

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.secureUrl}`);
  }

  getCart(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.secureUrl}/${id}`);
  }

  getCurrentCart(): Observable<Cart> {
    const httpParams: HttpParams = new HttpParams({fromString: QueryService.buildQueryParams(this.filters$.getValue())});
    return this.http.get<Cart>(`${this.secureUrl}`);
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.secureUrl}`, cart);
  }

  /**
   * Observable from promise update Cart
   */
  updateCart(cart: Cart): Observable<Cart> {
    cart.items = cart.items.map(i => {
      if (i.session && i.session.id) {
        i.session = i.session.id as unknown as Session;
      }
      if (i.product && i.product.id) {
        i.product = i.product.id as unknown as Product;
      }

      return i;
    });

    return this.http.put<Cart>(`${this.secureUrl}`, cart)
      .pipe(
        tap((next) => this.cart$.next(next))
      );
  }

  deleteCart(cart: Cart): Observable<void> {
    return this.http.delete<void>(`${this.secureUrl}/${cart.id}`);

  }
}
