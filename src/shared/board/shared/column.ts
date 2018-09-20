import { Card } from './card';

export interface Column {
  key?: string;
  title: string;
  boardId: string;
  order: number;
  cards?: Card[];
}
