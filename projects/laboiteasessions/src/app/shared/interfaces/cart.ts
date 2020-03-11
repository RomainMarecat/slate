import { Session } from './session';
import { Product } from './product';
import { User } from './user';

export interface CartItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
  product: Product;
  session: Session;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: string;
  total: number;
  user: User;
  status?: string;
  state?: 'cart' | 'connection' | 'delivery' | 'payment' | 'confirmation'; // current active route
  created_at: Date;
  updated_at: Date;
  items?: CartItem[];
  fees?: any;
  order?: string;
}
