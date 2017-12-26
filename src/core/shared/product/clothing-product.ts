export interface ClothingProduct {
  name: string;
  score: number;

  created_at: Date;
  published_at: Date;

  url: string;

  description ?: string;
  thumbnail: string;
  images ?: string[];
  image1: string;
  image2 ?: string;
  image3 ?: string;
  price: number;
  published: boolean;
  delivery_fee ?: number;
  delivery_free ?: boolean;
  reseller ?: string;
  key ?: string;
  user: string;
  creator ?: string;
  external_url ?: string;
  category ?: string;
}
