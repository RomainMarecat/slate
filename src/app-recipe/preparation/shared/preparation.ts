import { Ingredient } from '../../ingredient/shared/ingredient';

export interface Preparation {
  key?: string;
  ingredient: Ingredient;
  quantity: number;
  sentence: string;
}
