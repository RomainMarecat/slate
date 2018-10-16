import { ClothingProduct } from './clothing-product';
import { HockeyProduct } from './hockey-product';
import { firestore, Timestamp } from 'firebase/firestore';

export class Product implements ClothingProduct, HockeyProduct {
  name: string;
  slug ?: string;
  alias ?: string;
  keywords ?: string;

  brand ?: string;
  score: number;

  created_at: Date;
  published_at: Date | Timestamp;
  translations ?: {
    fr?: string;
  };

  url: string;

  key ?: string;
  user: string;
  creator ?: string;

  description ?: string;
  external_url ?: string;
  thumbnail: string;
  images ?: string[];
  image1: string;
  image2 ?: string;
  image3 ?: string;
  promo ?: number;
  price: number;
  old_price ?: number;
  quantity ?: number;
  size ?: Array<string>;
  published: boolean;
  delivery_fee ?: number;
  delivery_free ?: boolean;
  reseller ?: string;
  offers ?: string[];
  category ?: string;
  attributes ?: Array<any>;
  area?: string;

  constructor() {
    this.score = 0;
    this.published = false;
    this.created_at = new Date();
    this.published_at = new Date();
  }
}