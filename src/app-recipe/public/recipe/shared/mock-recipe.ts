import * as faker from 'faker';
import { Recipe } from './recipe';

export const mockRecipe: Recipe = {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: new Date(),
  cook_time: new Date(),
  prep_time: new Date(),
  waiting_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: [],
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3)
};

export const mockRecipes: Recipe[] = [{
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: new Date(),
  cook_time: new Date(),
  prep_time: new Date(),
  waiting_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: [],
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3)
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: new Date(),
  cook_time: new Date(),
  prep_time: new Date(),
  waiting_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: [],
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3)
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: new Date(),
  cook_time: new Date(),
  prep_time: new Date(),
  waiting_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: [],
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3)
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  total_time: new Date(),
  cook_time: new Date(),
  prep_time: new Date(),
  waiting_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: '',
  color: faker.internet.color(),
  ingredients: [],
  yield: faker.random.number({min: 1, max: 12}),
  rating: faker.random.number(3)
}];
