import { User } from '../../../interfaces/user';

export interface UserState {
  loginChecked: boolean;
  loggedIn: boolean;
  requestInProgress?: boolean;
  user?: User | false;
  jwt?: string;
}


export const initialUserState: UserState = {
  loginChecked: false,
  loggedIn: false
};
