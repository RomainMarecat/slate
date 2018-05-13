import { EventType, Event } from '../../agenda/shared/event';

export class Session extends Event {
  details: {
    event_type: EventType,
    nb_persons: number,
    booking?: any;
    info: string;
    // age?: Parameter;
    // level?: Parameter;
    // sport: Sport;
    // speciality?: Sport;
    // city: City;
    // meeting_point?: MeetingPoint;
    customers?: string[];
  };
}
