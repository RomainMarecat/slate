export interface Order {
  key?: string;
  cart: string;
  total: number;
  user: string;
  delivery?: string;
  items: OrderItem[];
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  key?: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}
