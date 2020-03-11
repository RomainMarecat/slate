import { Media } from './media';
import { Cart } from './cart';
import { User } from './user';
import { Delivery } from './delivery';
import { Payment } from './payment';

export interface Order {
  id: string;
  cart: Cart;
  total: number;
  delivery_fee: number;
  user: User;
  payment: Payment;
  delivery?: Delivery;
  order_items: OrderItem[];
  created_at: Date;
  updated_at: Date;
  shipping?: string;
  status: 'capture_authorized' | 'payment_authorized' | 'payment_error' | 'payment_cancelled';
}

export interface OrderItem {
  id: string;
  name: string;
  code: string;
  media: Media;
  quantity: number;
  price: number;
  is_eticket?: boolean;
  created_at: Date;
  updated_at: Date;
}
