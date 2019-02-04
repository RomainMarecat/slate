import { Ingredient } from '../../ingredient/shared/ingredient';
import { Preparation } from '../../preparation/shared/preparation';
import { Instruction } from '../../instruction/shared/instruction';

export interface Recipe {
  key?: string;
  name: string;
  slug: string;
  total_time: string;
  cook_time: string;
  prep_time: string;
  waiting_time: string;
  cuisine_type: string;
  difficulty: number;
  trick?: string;
  creator: string;
  author?: string;
  image: string;
  color: string;
  overlay_color: string;
  ingredients: Ingredient[];
  search_ingredients: string[];
  preparations: Preparation[];
  instructions?: Instruction[];
  yield: number;
  rating: number;
  on_homepage: boolean;
  associated_recipes: string[];
}
