import { IClothing } from './i-clothing';
import { FClothing } from './f-clothing';
import { Media } from './../media/media';

export class Clothing implements IClothing {
  name: string;

  score: number;

  created_at: Date;
  published_at: Date;

  url: string;

  key ? : string;
  user: string;

  description ? : string;
  external_url ? : string;
  thumbnail: string;
  image1: string;
  image2 ? : string;
  image3 ? : string;
  price: number;
  quantity ? : number;
  size ? : Array < string > ;
  published: boolean;
  delivery_fee ? : number;
  delivery_free ? : boolean;
  reseller ? : string;

  constructor() {
    this.score = 0;
    this.published = false;
    this.created_at = new Date();
    this.published_at = new Date();
  }
}
