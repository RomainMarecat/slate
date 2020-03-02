import { User } from './user';
import { Media } from './media';

export interface Product {
  name: string;
  slug?: string;
  alias?: string;
  media?: Media;
  keywords?: string;
  brand?: string;
  created_at: Date;
  published_at: any;
  translations?: {
    fr?: string;
  };
  url: string;
  id: string;
  user: User;
  is_new?: boolean;
  description?: string;
  short_description?: string;
  external_url?: string;
  thumbnail: string;
  images?: string[];
  image1: string;
  image2?: string;
  image3?: string;
  promo?: number;
  price: number;
  old_price?: number;
  quantity?: number;
  size?: Array<string>;
  published: boolean;
  delivery_fee?: number;
  delivery_free?: boolean;
  reseller?: string;
  offers?: string[];
  category?: string;
  area?: string;
  viewed?: number;
  commented?: number;
  specifications?: string[];
}
