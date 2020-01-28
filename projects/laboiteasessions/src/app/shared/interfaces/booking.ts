import { Event } from './event';
import { User } from './user';

export interface Booking {
  id: string;
  coach: User;
  customer: User;
  stripe_skey?: string;
  stripe_pkey?: string;
  addedByMono?: boolean;
  price?: number;
  isPayed?: boolean;
}

export interface BookingWithEvents {
  booking: Booking;
  events: Event[];
}

export interface BookingPayment {
  token: string;
  booking_id: string;
  key: string;
  amount: number;
  currency: string;
}
