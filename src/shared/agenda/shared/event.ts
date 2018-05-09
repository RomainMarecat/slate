export interface Event {
  _id?: any;
  auth0_id?: string;
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

export enum EventType {
  absence,
  session,
}
