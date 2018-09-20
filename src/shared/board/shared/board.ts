import { Column } from './column';
import { Card } from './card';

export interface Board {
  key?: string;
  title: string;
  columns?: Column[];
  cards?: Card[];
}
