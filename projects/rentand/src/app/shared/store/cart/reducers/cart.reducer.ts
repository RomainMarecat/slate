import { Actions } from '../../../../pages/cart/cart-list/action/cart-list.action';
import { CartState, initialCartState } from '../states/cart.state';

export function cartReducer(state = initialCartState, action: Actions): CartState {
  switch (action.type) {
    default:
      return state;
  }
}
