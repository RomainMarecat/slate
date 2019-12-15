import { User } from './user';

export interface OnlineSession {
  id: string;
  user: User;
  session_type: {
    name: string;
    max_persons: number;
    booking_delay: number;
    duration: number;
    pause: number;
  };
  sport_teached: string;
  city_teached: string;
  prices: number[];
  date_range: {
    start: string;
    end: string;
  };
  time_range: {
    start: string;
    end: string;
  };
}
