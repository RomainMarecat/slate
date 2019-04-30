import { User } from '../../user/shared/user';

export interface Conversation {
  key: string;
  contact: string;
  user?: User;
  message: string;
  created_at: Date;
  updated_at: Date;
}
