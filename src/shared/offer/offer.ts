export class Offer {
  key ?: string;
  product: string;
  partner?: string;
  price: number;
  external_url?: string;
  published: boolean;
  published_at: Date;
}

export interface CarOffer {
  key?: string;
  product: string;
  regDate: Date;
  mileage: number;
  gearbox: string;
  fuel: string;

  partner?: string;
  negotiable_price: boolean;
  price: number;
  images: string[];
  location: string;
  user: {
    username: string;
    email: string;
    phone: string;
  };
  published: boolean;
  published_at: Date;
}
