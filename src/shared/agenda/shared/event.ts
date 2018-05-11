export class Event {
  key?: string;
  start: Date;
  end: Date;
  details: any;
  comment?: string;
  custom_title?: string;
  group_booking?: string;
  pause?: number;
}

export enum EventType {
  absence,
  session,
}
