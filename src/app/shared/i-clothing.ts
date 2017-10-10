export interface IClothing {
  name: string;

  ugly: number;

  created_at: Date;
  added_at: Date;

  url: string;

  thumbnail: string;
  image1: string;
  image2?: string;
  image3?: string;
  price: number;

  key?: string;
}