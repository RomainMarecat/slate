import { Family } from './family';
import { SportTeached } from './sport-teached';
import { Media } from './media';

export interface Sport {
  id: string;
  name: string;
  slug: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  translations: object;
  parent?: Sport;
  sportsTeached: SportTeached[];
  sportTeachedSpecialites?: SportTeached[];
  children: Sport[];
  families: Family[];
  media?: Media;
}
