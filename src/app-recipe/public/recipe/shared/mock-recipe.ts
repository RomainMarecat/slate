import * as faker from 'faker';
import { Recipe } from './recipe';

export const mockRecipe: Recipe = {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  cook_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: faker.image.imageUrl(200, 200, 'cook'),
  color: faker.internet.color(),
};

export const mockRecipes: Recipe[] = [{
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  cook_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: faker.image.imageUrl(200, 200, 'cook'),
  color: faker.internet.color(),
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  cook_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: faker.image.imageUrl(200, 200, 'cook'),
  color: faker.internet.color(),
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  cook_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: faker.image.imageUrl(200, 200, 'cook'),
  color: faker.internet.color(),
}, {
  key: faker.random.uuid(),
  name: faker.commerce.productName(),
  slug: faker.commerce.productName(),
  cook_time: new Date(),
  cuisine_type: faker.commerce.productMaterial(),
  creator: faker.name.findName(),
  image: faker.image.imageUrl(200, 200, 'cook'),
  color: faker.internet.color(),
}];
