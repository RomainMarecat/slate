import { RouterReducerState } from '@ngrx/router-store';
import { FormsErrorsState, initialFormsErrorsState } from './forms-errors/states/forms-errors.state';
import { initialUserState, UserState } from './user/states/user.state';

export interface AppState {
  router?: RouterReducerState;
  user: UserState;
  formsErrors: FormsErrorsState;
}

export const initialAppState: AppState = {
  user: initialUserState,
  formsErrors: initialFormsErrorsState
};

export function getInitialState(): AppState {
  return initialAppState;
}

