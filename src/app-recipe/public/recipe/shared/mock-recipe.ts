import * as faker from 'faker';
import { Recipe } from './recipe';

export const mockRecipe: Recipe = {
  key: faker.random.uuid(),
  name: faker.commerce.productName()
};

export const mockRecipes: Recipe[] = [{
  key: faker.random.uuid(),
  name: faker.commerce.productName()
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName()
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName()
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName()
}];
