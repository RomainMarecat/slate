import { Media } from './media';

export interface UserMetadata {
  media?: Media;
  slug: string;
  firstname: string;
  lastname: string;
  phone: string;
  calling_code: string;
  birthday: string;
  gender: string;
  nationality: string;
  address: {
    street: string;
    state: string;
    zip_code: string;
    city: string;
    country: string;
  };
  mother_lang: string;
  avatar: string;
  languages: string[];
}
