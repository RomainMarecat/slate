import { Sport } from './sport';

export interface SportTeached {
  id: string;
  user_id?: string;
  sport: Sport;
  is_valid: boolean;
  is_online: boolean;
  instructor_title?: number;
  specialities?: number[];
  ages?: number[];
  levels?: number[];
  slug?: string;
  cancel_policy?: number;
  diploma_name?: string;
  pictures?: any[];
  descriptions?: {
    description1?: {
      fr?: string;
      en?: string;
    }
    description2?: {
      fr?: string;
      en?: string;
    }
    description3?: {
      fr?: string;
      en?: string;
    }
  };
  translations: object;
}
