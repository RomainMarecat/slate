import { Timestamp } from '../../util/timestamp';

export interface Article {
  key?: string;
  name: string;
  slug: string;
  translations?: {
    fr?: string
  };
  description: string;
  images?: string[];
  author?: string;
  category?: string;
  tags?: string[];
  published_at: Timestamp;
  published: boolean;

}
