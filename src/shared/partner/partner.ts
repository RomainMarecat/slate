import { Address } from '../address/shared/address';

export interface Partner {
  key: string;
  id?: string;
  name: string;
  slug?: string;
  lang_default?: string;
  website: string;
  published: boolean;
  published_at: Date;
  phone?: string;
  email?: string;
  description?: string;
  state?: number;
  address?: Address;
}
