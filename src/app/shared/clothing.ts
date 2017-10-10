import { IClothing } from './i-clothing';

export class Clothing implements IClothing {
  name: string;

  ugly: number;

  created_at: Date;
  added_at: Date;

  url: string;

  key?: string;

  description?: string;
  external_url?: string;
  thumbnail: string;
  image1: string;
  image2?: string;
  image3?: string;
  price: number;
  quantity?: number;
  size?: Array<string>;

  constructor(clothing: IClothing) {
    this.name = clothing.name;

    this.ugly = clothing.ugly;

    this.created_at = new Date();
    this.added_at = new Date();
    this.url = clothing.url;

    this.key = clothing.key;
    this.thumbnail = clothing.thumbnail;
    this.image1 = clothing.image1;
    this.image2 = clothing.image2;
    this.image3 = clothing.image3;
    this.price = clothing.price;
  }
}
