import { User } from '../../user/shared/user';
import { Product } from '../../product/shared/product';

export interface Favorite {
  key: string;
  product: Product;
  user: User;
}
