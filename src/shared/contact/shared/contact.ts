import { User } from '../../user/shared/user';

export interface Contact {
  key?: string;
  user: User;
  last_message: string;
  created_at: Date;
  updated_at: Date;
  conversations: string[];
}
