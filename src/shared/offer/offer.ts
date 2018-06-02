export class Offer {
  key ?: string;
  product: string;
  partner?: string;
  price: number;
  external_url?: string;
  published: boolean;
  published_at: Date | string;
}

export interface CarOffer {
  key?: string;
  regDate: Date;
  mileage: number;
  gearbox: string;
  fuel: string;
  brand: string;
  model: string;
  product: string;
  partner?: string;
  description: string;
  negotiable_price: boolean;
  price: number;
  images: string[];
  location: any;
  user: {
    username: string;
    email: string;
    phone: string;
  };
  published: boolean;
  published_at: Date | string;
}
