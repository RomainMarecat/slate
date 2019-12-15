import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Mono } from '../../../../shared/interfaces/mono';
import { Cart, MonoCart } from '../../shared/cart';
import { CartListService } from '../../shared/cart-list.service';
import { CartService } from '../../shared/cart.service';
import * as CartList from '../action/cart-list.action';

@Injectable({
  providedIn: 'root'
})
export class CartListEffect {

  /*****************************************************
   **************** Global cart effects *****************
   ******************************************************/

  @Effect() initCartList: Observable<Action> = this.actions$
    .pipe(
      ofType(CartList.INIT_CART),
      startWith((action: CartList.InitCartAction) => action),
      switchMap(() => {
        return this.cartListService.getMonosCartsList()
          .pipe(
            map((cart: Cart) => {
              return new CartList.InitCartActionSuccess(cart);
            }));
      })
    );

  /*****************************************************
   ****************** Mono cart effects *****************
   ******************************************************/

  @Effect() addCartMono: Observable<Action> = this.actions$
    .pipe(
      ofType(CartList.ADD_CART_MONO),
      map((action: CartList.AddCartMonoAction) => action.payload),
      switchMap((mono: Mono) =>
        this.cartListService.addCartMono(mono)
          .pipe(
            map((c: MonoCart) =>
              new CartList.AddCartMonoActionSuccess(c)
            )
          )
      )
    );

  @Effect() deleteCartMono: Observable<Action> = this.actions$
    .pipe(
      ofType(CartList.DELETE_CART_MONO),
      map((action: CartList.DeleteCartMonoAction) => action.payload),
      switchMap((mono: Mono) =>
        this.cartListService.deleteCartMono(mono)
          .pipe(
            map((c: Cart) =>
              new CartList.DeleteCartMonoActionSuccess(c as MonoCart)
            ))
      )
    );

  /*****************************************************
   ****************** Cart items effects ****************
   ******************************************************/

  @Effect() addCartItem: Observable<Action> = this.actions$
    .pipe(
      ofType(CartList.ADD_CART_ITEM),
      map((action: CartList.AddCartItemAction) => {
        return {mono: action.mono, cartItem: action.payload};
      }),
      switchMap((params: any) =>
        this.cartListService.addCartItem(params.mono, params.cartItem)
          .pipe(
            map((c: Cart) =>
              new CartList.AddCartItemActionSuccess(c)
            )
          )
      )
    );

  @Effect() deleteCartItem: Observable<Action> = this.actions$
    .pipe(
      ofType(CartList.DELETE_CART_ITEM),
      map((action: CartList.DeleteCartItemAction) => {
        return {mono: action.mono, cartItem: action.payload};
      }),
      switchMap((params: any) =>
        this.cartListService.deleteCartItem(params.mono, params.cartItem)
          .pipe(map((c: Cart) => {
            this.cartService.emitDeleteSuccessSession({mono: params.mono, item: params.cartItem.session});
            return new CartList.DeleteCartItemActionSuccess(c);
          }))
      )
    );

  constructor(private actions$: Actions,
              private cartListService: CartListService,
              private cartService: CartService) {
  }
}
