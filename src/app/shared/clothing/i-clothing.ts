import { Media } from './../media/media';

export interface IClothing {
  name: string;

  score: number;

  created_at: Date;
  published_at: Date;

  url: string;

  thumbnail: string;
  image1: string;
  image2 ? : string;
  image3 ? : string;
  price: number;
  published: boolean;
  delivery_fee ? : number;
  delivery_free ? : boolean;
  reseller ? : string;
  key ? : string;
  user: string;
  external_url ? : string;
}
