import { User } from './user';
import { CityTeached } from './city-teached';
import { SportTeached } from './sport-teached';

export interface Mono extends User {
  age?: number;
  sports_teached?: any[]|SportTeached[];
  cities_teached?: any[]|CityTeached[];
}
