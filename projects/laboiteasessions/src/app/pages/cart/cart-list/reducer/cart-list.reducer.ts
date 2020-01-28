import { Cart, MonoCart } from '../../shared/cart';
import * as CartList from '../action/cart-list.action';

export interface CartListState {
  mono_carts: Array<MonoCart>;
  active_cart_mono: MonoCart;
}

export const initialCartListState: CartListState = {
  mono_carts: [] as Array<MonoCart>,
  active_cart_mono: {
    mono: null,
    cart_items: []
  } as MonoCart
};

export function cartListReducer(state = initialCartListState, action: CartList.Actions): CartListState {
  switch (action.type) {
    /* global cart */
    case CartList.INIT_CART_SUCCESS:
      return {...state, mono_carts: (action.payload as Cart).mono_carts};

    case CartList.DELETE_CART_SUCCESS:
      return {...state, mono_carts: []};

    case CartList.UPDATE_CART_SUCCESS:
      return {...state, mono_carts: (action.payload as Cart).mono_carts as MonoCart[]};

    /* mono cart */
    case CartList.ADD_CART_MONO_SUCCESS:
      return {
        ...state,
        mono_carts: [...state.mono_carts, action.payload] as MonoCart[],
        active_cart_mono: action.payload as MonoCart
      };

    case CartList.DELETE_CART_MONO_SUCCESS:
      return {...state, mono_carts: (action.payload as Cart).mono_carts, active_cart_mono: {}};

    /* cart item */
    case CartList.ADD_CART_ITEM_SUCCESS:
      return {...state, mono_carts: (action.payload as Cart).mono_carts as MonoCart[]};

    case CartList.DELETE_CART_ITEM_SUCCESS:
      return {...state, mono_carts: (action.payload as Cart).mono_carts as MonoCart[]};

    case CartList.UPDATE_CART_ITEM_SUCCESS:
      return {...state, active_cart_mono: action.payload as MonoCart};

    default:
      return state;
  }
}

export const getCartMonos = (state: CartListState) => state.mono_carts;
