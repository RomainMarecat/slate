import { Mono } from '../../../shared/interfaces/mono';
import { CartItem } from './cart-item';

export interface MonoCart {
  mono?: Mono;
  cart_items?: Array<CartItem>;
}

export interface Cart {
  mono_carts?: Array<MonoCart>;
}
