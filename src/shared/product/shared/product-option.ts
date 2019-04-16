import { Product } from './product';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';
import { Moment } from 'moment';

export interface SpecificProductOption {
  favorite?: {
    display_icon: boolean;
  };
  layout: string;
  limit?: number;
  order_by?: {column: string, direction: string};
  display_title: boolean;
  title: string;
  products: Product[];
  threshold?: Moment | number;
}

export interface ProductOption {
  authenticated: boolean;
  product_new?: SpecificProductOption;
  product_recent_month?: SpecificProductOption;
  product_best?: SpecificProductOption;
  product_most_viewed?: SpecificProductOption;
  product_most_commented?: SpecificProductOption;
  product_most_ordered?: SpecificProductOption;
  cart: Cart;
  user: User;
}
