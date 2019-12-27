import { Sport } from './sport';

export interface Family {
  id: string;
  name: string;
  slug: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  translations: object;
  parent?: Family;
  children: Family[];
  sports: Sport[];
}
