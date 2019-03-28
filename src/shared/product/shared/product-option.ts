import { Product } from './product';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';
import { Moment } from 'moment';

export interface ProductOption {
  authenticated: boolean;
  product_new?: {
    layout: string;
    limit: number;
    initial_products: Product[];
    display_title: boolean;
    title: string;
    products: Product[];
  };
  product_recent_month?: {
    layout: string;
    limit: number;
    display_title: boolean;
    title: string;
    threshold: Moment;
    products: Product[];
  };
  product_best?: {
    layout: string;
    limit: number;
    display_title: boolean;
    title: string;
    threshold: number;
    products: Product[];
  };
  product_most_viewed?: {
    layout: string;
    limit: number;
    products: Product[],
    title: string;
    threshold: number;
    display_title: boolean
  };
  product_most_commented?: {
    layout: string;
    limit: number;
    products: Product[],
    title: string;
    threshold: number;
    display_title: boolean
  };
  cart: Cart;
  user: User;
}
