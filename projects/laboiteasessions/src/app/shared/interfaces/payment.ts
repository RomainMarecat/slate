import { Order } from './order';

export interface Payment {
  id: string;
  token: any;
  order: Order;
  created_at: Date;
  updated_at: Date;
}
