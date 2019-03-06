import * as faker from 'faker';
import { Favorite } from './favorite';
import { mockUser } from '../../user/shared/mock-user';
import { mockProduct } from '../../product/shared/mock-product';

export const mockFavorite: Favorite = {
  key: faker.random.uuid(),
  product: mockProduct.key,
  user: mockUser.uid
};

export const mockFavorites: Favorite[] = [
  {
    key: faker.random.uuid(),
    product: mockProduct.key,
    user: mockUser.uid
  },
  {
    key: faker.random.uuid(),
    product: mockProduct.key,
    user: mockUser.uid
  },
  {
    key: faker.random.uuid(),
    product: mockProduct.key,
    user: mockUser.uid
  }
];
