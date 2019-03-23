import { Product } from './product';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';

export interface ProductOption {
  layout: string;
  authenticated: boolean;
  product_new?: {
    initial_products: Product[];
    display_title: boolean;
    title: string;
    products: Product[];
  };
  product_recent_month?: {
    display_title: boolean;
    title: string;
    products: Product[];
  };
  product_best?: {
    display_title: boolean;
    title: string;
    products: Product[];
  };
  product_most_viewed?: {
    products: Product[],
    title: string;
    display_title: boolean
  };
  product_most_commented?: {
    products: Product[],
    title: string;
    display_title: boolean
  };
  cart: Cart;
  user: User;
}
