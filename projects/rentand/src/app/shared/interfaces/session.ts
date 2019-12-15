import { MeetingPoint } from './meeting-point';
import { City } from './city';
import { Parameter } from './parameter';
import { Sport } from './sport';
import { Event, EventType } from './event';

export interface Session extends Event {
  details: {
    price?: number;
    event_type: EventType,
    nb_persons: number,
    booking?: any;
    age?: Parameter;
    level?: Parameter;
    sport: Sport;
    speciality?: Sport;
    city: City;
    meeting_point?: MeetingPoint;
    customers?: string[];
  };
}
