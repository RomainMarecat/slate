import { Order } from './order';
import * as faker from 'faker';

export const mockOrder: Order = {
  key: faker.random.uuid(),
  total: 100,
  user: faker.random.uuid(),
  delivery: faker.random.uuid(),
  items: [],
  delivery_fee: 0,
  created_at: new Date(),
  updated_at: new Date(),
  cart: 'fs6ffd2g6f9d'
};
