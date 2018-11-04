import { Ingredient } from './ingredient';
import * as faker from 'faker';

export const mockIngredient: Ingredient = {
  key: faker.random.number().toString(10),
  name: faker.commerce.productMaterial(),
  color: faker.internet.color()
};

export const mockIngredient2: Ingredient = {
  key: faker.random.number().toString(10),
  name: faker.commerce.productMaterial(),
  color: faker.internet.color()
};

export const mockIngredient3: Ingredient = {
  key: faker.random.number().toString(10),
  name: faker.commerce.productMaterial(),
  color: faker.internet.color()
};

export const mockIngredients: Ingredient[] = [
  {
    key: faker.random.number().toString(10),
    name: 'sel'
  },
  {
    key: faker.random.number().toString(10),
    name: 'tomate'
  },
  {
    key: faker.random.number().toString(10),
    name: 'poivre'
  }
];
