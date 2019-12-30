import { InjectionToken } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { cartReducer } from './cart/reducers/cart.reducer';
import { userReducers } from './user/reducers/user.reducer';
import { formsErrorsReducers } from './forms-errors/reducers/forms-errors.reducer';

export const APP_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('APP_REDUCERS');

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  cart: cartReducer,
  user: userReducers,
  formsErrors: formsErrorsReducers
};
