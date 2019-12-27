import { InjectionToken } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { cartReducer } from '../../pages/cart/shared/cart.reducer';
import { AppState } from './app.state';

export const APP_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>('APP_REDUCERS');

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  cart: cartReducer
};
