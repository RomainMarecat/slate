export interface Order {
  key?: string;
  cart: string;
  total: number;
  delivery_fee: number;
  user: string;
  delivery?: string;
  items: OrderItem[];
  created_at: Date;
  updated_at: Date;
  shipping?: string;
  status: 'capture_authorized' | 'payment_authorized' | 'payment_error' | 'payment_cancelled';
}

export interface OrderItem {
  key?: string;
  name: string;
  code: string;
  image: string;
  quantity: number;
  price: number;
  is_eticket?: boolean;
  created_at: Date;
  updated_at: Date;
}
