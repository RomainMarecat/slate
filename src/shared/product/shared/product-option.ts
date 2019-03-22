import { Product } from './product';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';

export interface ProductOption {
  layout: string;
  authenticated: boolean;
  product_new?: {
    display_title: boolean;
    products: Product[];
    products_displayed: Product[];
  };
  product_recent_month?: {
    display_title: boolean;
    products: Product[];
  };
  product_best?: {
    display_title: boolean;
    products: Product[];
  };
  cart: Cart;
  user: User;
}
