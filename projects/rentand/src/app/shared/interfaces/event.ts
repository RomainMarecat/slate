import { User } from './user';

export enum EventType {
  absence,
  session,
}

export interface Event {
  id: string;
  event_type: EventType;
  user: User;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  details: any;
  comment?: string;
  custom_title?: string;
  group_booking?: string;
  pause?: number;
}
