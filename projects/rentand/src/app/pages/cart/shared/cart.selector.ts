import { createSelector } from '@ngrx/store';
import { AppState } from '../../../shared/store/app.state';
import { CartState } from './cart.state';

export const selectCart = (appState: AppState) => appState.cart;

export const selectMonosCart = createSelector(
  selectCart,
  (state: CartState) => state.cart && state.cart.mono_carts ? state.cart.mono_carts : []
);
