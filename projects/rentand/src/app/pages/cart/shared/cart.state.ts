import { CartListState } from '../cart-list/reducer/cart-list.reducer';

export interface CartState {
  cart: CartListState;
}

export const initialCartState: CartState = {
  cart: null
};
