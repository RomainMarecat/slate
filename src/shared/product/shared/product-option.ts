import { Product } from './product';
import { Cart } from '../../cart/shared/cart';
import { User } from '../../user/shared/user';

export interface ProductOption {
  layout: string;
  authenticated: boolean;
  new_products: Product[];
  new_products_displayed: Product[];
  recent_month_products: Product[];
  cart: Cart;
  user: User;
}
