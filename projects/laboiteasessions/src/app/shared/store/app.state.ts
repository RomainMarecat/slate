import { RouterReducerState } from '@ngrx/router-store';
import { CartState, initialCartState } from './cart/states/cart.state';
import { FormsErrorsState, initialFormsErrorsState } from './forms-errors/states/forms-errors.state';
import { initialUserState, UserState } from './user/states/user.state';

export interface AppState {
  router?: RouterReducerState;
  cart: CartState;
  user: UserState;
  formsErrors: FormsErrorsState;
}

export const initialAppState: AppState = {
  cart: initialCartState,
  user: initialUserState,
  formsErrors: initialFormsErrorsState
};

export function getInitialState(): AppState {
  return initialAppState;
}

