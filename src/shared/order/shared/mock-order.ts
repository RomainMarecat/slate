import { Order } from './order';
import * as faker from 'faker';

export const mockOrder: Order = {
  key: faker.random.uuid(),
  total: 100,
  user: faker.random.uuid(),
  items: [],
  created_at: new Date(),
  updated_at: new Date(),
};
