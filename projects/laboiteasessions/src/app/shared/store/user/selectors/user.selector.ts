import { createSelector } from '@ngrx/store';
import { User } from '../../../interfaces/user';
import { AppState } from '../../app.state';
import { UserState } from '../states/user.state';

export const selectUser = (state: AppState): UserState => state.user;

export const selectLoggedIn = createSelector(
  selectUser,
  (state: UserState): boolean => state.loginChecked && state.loggedIn
);

export const selectAuthenticatedUser = createSelector(
  selectUser,
  (state: UserState): User | false => state.user
);
