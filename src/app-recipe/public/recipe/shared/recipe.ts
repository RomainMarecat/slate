import { Ingredient } from '../../ingredient/shared/ingredient';

export interface Recipe {
  key?: string;
  name: string;
  slug: string;
  total_time: Date;
  cook_time: Date;
  prep_time: Date;
  waiting_time: Date;
  cuisine_type: string;
  creator: string;
  image: string;
  color: string;
  ingredients: Ingredient[];
  yield: number;
  rating: number;
}
