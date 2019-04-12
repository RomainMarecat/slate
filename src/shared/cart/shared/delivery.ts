export interface Delivery {
  key: string;
  cart: string[];
  order?: string[];
  user: string;
  address: {
    title?: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    address_complement: string;
    zipcode: string;
    city: string;
    country: string;
  };
  billing: {
    title?: string;
    email: string;
    firstname: string;
    lastname: string;
    address: string;
    address_complement: string;
    zipcode: string;
    city: string;
    country: string;
  };
  created_at: Date;
  updated_at: Date;
}
