export interface CartItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  image: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export interface Cart {
  id: string;
  total: number;
  user: string;
  status?: string;
  state?: 'cart' | 'connection' | 'delivery' | 'payment' | 'confirmation'; // current active route
  created_at: Date;
  updated_at: Date;
  items?: CartItem[];
  fees?: any;
  order?: string;
}
