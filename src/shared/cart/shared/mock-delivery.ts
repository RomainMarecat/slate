import { Delivery } from './delivery';
import * as faker from 'faker';

export const mockDeliveries: Delivery[] = [
  {
    key: 'd6fs62',
    cart: ['dsf6g2fs65gfd6gf23fdg9fd'],
    user: 'fsdfsd6f2',
    address: {
      email: faker.random.words(),
      firstname: faker.random.words(),
      lastname: faker.random.words(),
      address: faker.random.words(),
      address_complement: faker.random.words(),
      zipcode: faker.random.words(),
      city: faker.random.words(),
      country: faker.random.words(),
    },
    billing: {
      email: faker.random.words(),
      firstname: faker.random.words(),
      lastname: faker.random.words(),
      address: faker.random.words(),
      address_complement: faker.random.words(),
      zipcode: faker.random.words(),
      city: faker.random.words(),
      country: faker.random.words(),
    },
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    key: 'd6fs62',
    cart: ['dsf6g2fs65gfd6gf23fdg9fd'],
    user: 'fsdfsd6f2',
    address: {
      email: faker.random.words(),
      firstname: faker.random.words(),
      lastname: faker.random.words(),
      address: faker.random.words(),
      address_complement: faker.random.words(),
      zipcode: faker.random.words(),
      city: faker.random.words(),
      country: faker.random.words(),
    },
    billing: {
      email: faker.random.words(),
      firstname: faker.random.words(),
      lastname: faker.random.words(),
      address: faker.random.words(),
      address_complement: faker.random.words(),
      zipcode: faker.random.words(),
      city: faker.random.words(),
      country: faker.random.words(),
    },
    created_at: new Date(),
    updated_at: new Date(),
  }
];


export const mockDelivery: Delivery = {
  key: 'd6fs62',
  cart: ['dsf6g2fs65gfd6gf23fdg9fd'],
  user: 'fsdfsd6f2',
  address: {
    email: faker.random.words(),
    firstname: faker.random.words(),
    lastname: faker.random.words(),
    address: faker.random.words(),
    address_complement: faker.random.words(),
    zipcode: faker.random.words(),
    city: faker.random.words(),
    country: faker.random.words(),
  },
  billing: {
    email: faker.random.words(),
    firstname: faker.random.words(),
    lastname: faker.random.words(),
    address: faker.random.words(),
    address_complement: faker.random.words(),
    zipcode: faker.random.words(),
    city: faker.random.words(),
    country: faker.random.words(),
  },
  created_at: new Date(),
  updated_at: new Date(),
};
