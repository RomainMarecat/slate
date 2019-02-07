import { firestore } from 'firebase';
import Timestamp = firestore.Timestamp;

export interface CarProduct {
  name: string;
  score: number;

  brand?: string;
  model?: string;

  created_at: Date;
  published_at: Timestamp;

  url: string;
  translations?: {
    fr?: string;
  };

  description?: string;
  thumbnail: string;
  images?: string[];
  image1: string;
  promo?: number;
  price: number;
  published: boolean;
  delivery_fee?: number;
  reseller?: string;
  offers?: string[];
  key?: string;
  user: string;
  creator?: string;
  external_url?: string;
  category?: string;
  attributes?: Array<any>;
  area?: string;
  yearMin?: number;
  yearMax?: number;
  fuel?: string;
  gearbox?: string;
  door_number?: number;
  type?: string;
}

export const mileages: number[] = [
  10000,
  20000,
  30000,
  40000,
  50000,
  60000,
  70000,
  80000,
  90000,
  100000,
  120000,
  150000,
  175000,
  200000,
  230000,
  250000,
  300000
];
