import * as faker from 'faker';
import { Favorite } from './favorite';
import { mockUser } from '../../user/shared/mock-user';

export const mockFavorite: Favorite = {
  key: faker.random.uuid(),
  product: null,
  user: mockUser
};

export const mockFavorites: Favorite[] = [
  {
    key: faker.random.uuid(),
    product: null,
    user: mockUser
  },
  {
    key: faker.random.uuid(),
    product: null,
    user: mockUser
  },
  {
    key: faker.random.uuid(),
    product: null,
    user: mockUser
  }
];
