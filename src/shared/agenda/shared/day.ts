import { Moment } from 'moment';

export interface Day {
  title: string;
  key: string;
  value: Moment;
  // availabilities: Map<string, string[]>;
}
