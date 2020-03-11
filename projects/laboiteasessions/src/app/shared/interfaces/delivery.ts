import { Cart } from './cart';
import { Order } from './order';
import { User } from './user';

export interface Address {
  id: string;
  title?: string;
  email: string;
  firstname: string;
  lastname: string;
  street: string;
  street_complement?: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Delivery {
  id: string;
  carts: Cart[];
  orders?: Order[];
  user: User;
  address: Address;
  billing: Address;
  created_at: Date;
  updated_at: Date;
}
