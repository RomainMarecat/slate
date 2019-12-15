import { RouterReducerState } from '@ngrx/router-store';
import { CartState, initialCartState } from '../../pages/cart/shared/cart.state';

export interface AppState {
  router?: RouterReducerState;
  cart: CartState;
}

export const initialAppState: AppState = {
  cart: initialCartState
};

export function getInitialState(): AppState {
  return initialAppState;
}

