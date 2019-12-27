import { Actions } from '../cart-list/action/cart-list.action';
import { CartState, initialCartState } from './cart.state';

export function cartReducer(state = initialCartState, action: Actions): CartState {
  switch (action.type) {
    default:
      return state;
  }
}
