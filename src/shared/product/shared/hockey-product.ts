import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface HockeyProduct {
  name: string;
  score: number;

  brand?: string;

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

}
