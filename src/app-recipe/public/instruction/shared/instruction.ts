import { Ingredient } from '../../ingredient/shared/ingredient';

export interface Instruction {
  key?: string;
  order_index: number;
  sentence: string;
  ingredients?: Ingredient[];
  image: string;
}
