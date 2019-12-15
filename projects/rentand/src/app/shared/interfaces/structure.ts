import { User } from './user';

export interface Structure {
  _id: any;
  main_picture: string;
  name: string;
  slug: string;
  user_id: string[]|User[];
}
