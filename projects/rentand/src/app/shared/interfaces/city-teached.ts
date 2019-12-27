import { City } from './city';
import { Media } from './media';
import { MeetingPoint } from './meeting-point';

export interface CityTeached {
  id: string;
  city?: City;
  personalMeetingPointAccepted?: boolean;
  picture?: Media;
}
