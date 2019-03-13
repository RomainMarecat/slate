export interface Delivery {
  key: string;
  cart: string;
  address: {
    email: string;
    address: string;
    address_complement: string;
    zipcode: string;
    city: string;
    country: string;
  };
  billing: {
    email: string;
    address: string;
    address_complement: string;
    zipcode: string;
    city: string;
    country: string;
  };
  created_at: Date;
  updated_at: Date;
}
