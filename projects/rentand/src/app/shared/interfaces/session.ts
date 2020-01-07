import { OnlineSession } from '@romainmarecat/ngx-calendar';
import { City } from './city';
import { Event } from './event';
import { MeetingPoint } from './meeting-point';
import { Parameter } from './parameter';
import { Sport } from './sport';
import { User } from './user';

export interface Session extends Event {
  price?: number;
  nb_persons: number,
  booking?: any;
  age?: Parameter;
  level?: Parameter;
  sport: Sport;
  speciality?: Sport;
  city: City;
  meeting_point?: MeetingPoint;
  customers?: User[];
  online_session?: OnlineSession;
}
