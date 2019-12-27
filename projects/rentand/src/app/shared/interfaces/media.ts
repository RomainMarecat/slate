import { User } from './user';

export interface Media {
  id: string;
  filename: string;
  url: string;
  ext: string;
  alt: string;
  created_at: string;
  updated_at: string;
  user: User;
  sport_teached: string;
}
