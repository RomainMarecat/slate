import { Action } from '@ngrx/store';
import { Cart } from '../../shared/cart';
import { MonoCart } from '../../shared/cart';
import { CartItem } from '../../shared/cart-item';
import { Mono } from '../../../../shared/interfaces/mono';

/* Global cart */
export const INIT_CART = '[CartList] List initial loading';
export const INIT_CART_SUCCESS = '[CartList] List initial success success';
export const INIT_CART_FAIL = '[CartList] List initial loading fail';
export const DELETE_CART = '[CartList] Delete cart';
export const DELETE_CART_SUCCESS = '[CartList] Delete cart success';
export const DELETE_CART_FAIL = '[CartList] Delete cart fail';
export const UPDATE_CART = '[CartList] Update cart';
export const UPDATE_CART_SUCCESS = '[CartList] Update cart success';
export const UPDATE_CART_FAIL = '[CartList] Update cart fail';

/* Mono cart */
export const DELETE_CART_MONO = '[CartList] Delete cart mono';
export const DELETE_CART_MONO_SUCCESS = '[CartList] Delete cart mono success';
export const DELETE_CART_MONO_FAIL = '[CartList] Delete cart mono fail';
export const UPDATE_CART_MONO = '[CartList] Update cart mono';
export const UPDATE_CART_MONO_SUCCESS = '[CartList] Update cart mono success';
export const UPDATE_CART_MONO_FAIL = '[CartList] Update cart mono fail';
export const GET_CART_MONO = '[CartList] Get cart mono';
export const GET_CART_MONO_SUCCESS = '[CartList] Get cart mono success';
export const GET_CART_MONO_FAIL = '[CartList] Get cart mono fail';
export const ADD_CART_MONO = '[CartList] Add monoCart';
export const ADD_CART_MONO_SUCCESS = '[CartList] Add monoCart success';
export const ADD_CART_MONO_FAIL = '[CartList] Add monoCart fail';

/* Cart items */
export const DELETE_CART_ITEM = '[CartList] Delete cartItem';
export const DELETE_CART_ITEM_SUCCESS = '[CartList] Delete cartItem success';
export const DELETE_CART_ITEM_FAIL = '[CartList] Delete cartItem fail';
export const ADD_CART_ITEM = '[CartList] Add cartItem';
export const ADD_CART_ITEM_SUCCESS = '[CartList] Add cartItem success';
export const ADD_CART_ITEM_FAIL = '[CartList] Add cartItem fail';
export const UPDATE_CART_ITEM = '[CartList] Update cartItem';
export const UPDATE_CART_ITEM_SUCCESS = '[CartList] Update cartItem success';
export const UPDATE_CART_ITEM_FAIL = '[CartList] Update cartItem fail';
export const GET_CART_ITEM = '[CartList] Get cart item';
export const GET_CART_ITEM_SUCCESS = '[CartList] Get cart item success';
export const GET_CART_ITEM_FAIL = '[CartList] Get cart item fail';

/*****************************************************
**************** Global cart actions *****************
******************************************************/

/* Init */
export class InitCartAction implements Action {
  type = INIT_CART;
  payload: Array<MonoCart> = [] as Array<MonoCart>;

  constructor() { }
}

export class InitCartActionSuccess implements Action {
  type = INIT_CART_SUCCESS;

  constructor(public payload: Cart) { }
}

export class InitCartActionFail implements Action {
  type = INIT_CART_FAIL;

  constructor(public payload: Cart) { }
}

/* Update */
export class UpdateCartAction implements Action {
  type = UPDATE_CART;

  constructor(public payload: Cart) { }
}

export class UpdateCartActionSuccess implements Action {
  type = UPDATE_CART_SUCCESS;

  constructor(public payload: Cart) { }
}

export class UpdateCartActionFail implements Action {
  type = UPDATE_CART_FAIL;

  constructor(public payload: Cart) { }
}

/* Delete */
export class DeleteCartAction implements Action {
  type = DELETE_CART;
  payload: Cart = {} as Cart;

  constructor() { }
}

export class DeleteCartActionSuccess implements Action {
  type = DELETE_CART_SUCCESS;

  constructor(public payload: Cart) { }
}

export class DeleteCartActionFail implements Action {
  type = DELETE_CART_FAIL;

  constructor(public payload: Cart) { }
}

/*****************************************************
****************** Cart Mono actions *****************
******************************************************/

/* Add */
export class AddCartMonoAction implements Action {
  type = ADD_CART_MONO;

  constructor(public payload: Mono) { }
}

export class AddCartMonoActionSuccess implements Action {
  type = ADD_CART_MONO_SUCCESS;

  constructor(public payload: MonoCart) { }
}

export class AddCartMonoActionFail implements Action {
  type = ADD_CART_MONO_FAIL;

  constructor(public payload: Array<MonoCart>) { }
}

/* Delete */
export class DeleteCartMonoAction implements Action {
  type = DELETE_CART_MONO;
  constructor(public payload: Mono) { }
}

export class DeleteCartMonoActionSuccess implements Action {
  type = DELETE_CART_MONO_SUCCESS;

  constructor(public payload: MonoCart) { }
}

export class DeleteCartMonoActionFail implements Action {
  type = DELETE_CART_MONO_FAIL;

  constructor(public payload: MonoCart) { }
}

/* Update */
// export class UpdateCartMonoAction implements Action {
//   type = UPDATE_CART_MONO;

//   constructor(public payload: MonoCart) { }
// }

// export class UpdateCartMonoActionSuccess implements Action {
//   type = UPDATE_CART_MONO_SUCCESS;

//   constructor(public payload: MonoCart) { }
// }

// export class UpdateCartMonoActionFail implements Action {
//   type = UPDATE_CART_MONO_FAIL;

//   constructor(public payload: MonoCart) { }
// }

/* Get */
// export class GetCartMonoAction implements Action {
//   type = GET_CART_MONO;

//   constructor(public payload: MonoCart, public mono: Mono) { }
// }

// export class GetCartMonoActionSuccess implements Action {
//   type = GET_CART_MONO_SUCCESS;

//   constructor(public payload: MonoCart) { }
// }

// export class GetCartMonoActionFail implements Action {
//   type = GET_CART_MONO_FAIL;

//   constructor(public payload: Array<MonoCart>) { }
// }

/*****************************************************
**************** Cart item actions *******************
******************************************************/

/* Delete */
export class DeleteCartItemAction implements Action {
  type = DELETE_CART_ITEM;

  constructor(public mono: Mono, public payload: CartItem) { }
}

export class DeleteCartItemActionSuccess implements Action {
  type = DELETE_CART_ITEM_SUCCESS;

  constructor(public payload: Cart) { }
}

export class DeleteCartItemActionFail implements Action {
  type = DELETE_CART_ITEM_FAIL;

  constructor(public payload: Cart) { }
}

/* Add */
export class AddCartItemAction implements Action {
  type = ADD_CART_ITEM;

  constructor(public mono: Mono, public payload: CartItem) { }
}

export class AddCartItemActionSuccess implements Action {
  type = ADD_CART_ITEM_SUCCESS;

  constructor(public payload: Cart) { }
}

export class AddCartItemActionFail implements Action {
  type = ADD_CART_ITEM_FAIL;

  constructor(public payload: Cart) { }
}

/* Update */

export class UpdateCartItemAction implements Action {
  type = UPDATE_CART_ITEM;

  constructor(public mono: Mono, public payload: Array<CartItem>) { }
}

export class UpdateCartItemActionSuccess implements Action {
  type = UPDATE_CART_ITEM_SUCCESS;

  constructor(public payload: Cart) { }
}

export class UpdateCartItemActionFail implements Action {
  type = UPDATE_CART_ITEM_FAIL;

  constructor(public payload: Cart) { }
}

/* Get */
// export class GetCartItemAction implements Action {
//   type = GET_CART_ITEM;

//   constructor(public mono: Mono, public payload: Array<CartItem>, public id: number) { }
// }

// export class GetCartItemActionSuccess implements Action {
//   type = GET_CART_ITEM_SUCCESS;

//   constructor(public payload: CartItem) { }
// }

// export class GetCartItemActionFail implements Action {
//   type = GET_CART_ITEM_FAIL;

//   constructor(public payload: Array<CartItem>) { }
// }

/******************************************************************/

export type Actions
  = InitCartAction
  | InitCartActionSuccess
  | InitCartActionFail
  | DeleteCartAction
  | DeleteCartActionSuccess
  | DeleteCartActionFail
  | UpdateCartAction
  | UpdateCartActionSuccess
  | UpdateCartActionFail

  | DeleteCartMonoAction
  | DeleteCartMonoActionSuccess
  | DeleteCartMonoActionFail
  | AddCartMonoAction
  | AddCartMonoActionSuccess
  | AddCartMonoActionFail
  // | UpdateCartMonoAction
  // | UpdateCartMonoActionSuccess
  // | UpdateCartMonoActionFail
  // | GetCartMonoAction
  // | GetCartMonoActionSuccess
  // | GetCartMonoActionFail

  | DeleteCartItemAction
  | DeleteCartItemActionSuccess
  | DeleteCartItemActionFail
  | AddCartItemAction
  | AddCartItemActionSuccess
  | AddCartItemActionFail
  | UpdateCartItemAction
  | UpdateCartItemActionSuccess
  | UpdateCartItemActionFail
  // | GetCartItemAction
  // | GetCartItemActionSuccess
  // | GetCartItemActionFail;
  ;
