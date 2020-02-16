export interface Address {
  id: string;
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
  id: string;
  cart: string[];
  order?: string[];
  user: string;
  address: Address;
  billing: Address;
  created_at: Date;
  updated_at: Date;
}
