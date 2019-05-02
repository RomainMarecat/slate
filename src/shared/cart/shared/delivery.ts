export interface Address {
  title?: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  address_complement: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface Delivery {
  key: string;
  cart: string[];
  order?: string[];
  user: string;
  address: Address;
  billing: Address;
  created_at: Date;
  updated_at: Date;
}
