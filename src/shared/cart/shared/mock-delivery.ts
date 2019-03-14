import { Delivery } from './delivery';
import * as faker from 'faker';

export const mockDeliveries: Delivery[] = [
  {
    key: 'd6fs62',
    cart: '6dq6sdq',
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
    cart: '6dq6sdq',
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
  cart: '6dq6sdq',
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
