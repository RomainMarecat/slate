import { Structure } from './structure';
import { UserMetadata } from './user-metadata';

export interface User {
  id: string;
  email: string;
  email_verified?: boolean;
  password: string;
  updated_at?: string;
  name?: string;
  last_login?: Date;
  structure?: Structure;
  user_metadata: UserMetadata;
  app_metadata: {
    laboiteasessions: {
      admin?: boolean;
      mono: boolean;
      structure?: boolean;
    }
    message?: boolean;
  };
  identities?: any[];
  connection?: string;
  created_at?: string;
}
