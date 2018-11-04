import { Ingredient } from '../../ingredient/shared/ingredient';
import { Preparation } from '../../preparation/shared/preparation';
import { Instruction } from '../../instruction/shared/instruction';

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
  preparations: Preparation[];
  instructions?: Instruction[];
  yield: number;
  rating: number;
  on_homepage: boolean;
}
