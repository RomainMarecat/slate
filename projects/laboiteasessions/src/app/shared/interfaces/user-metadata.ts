import { Media } from './media';
import { Phone } from './phone';

export interface UserMetadata {
  media?: Media;
  slug: string;
  firstname: string;
  lastname: string;
  phone: Phone;
  calling_code: string;
  birthday: Date;
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
