import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { AddCartItemAction, DeleteCartItemAction, InitCartAction } from './cart-list/action/cart-list.action';
import { Cart } from './shared/cart';
import { CartItem } from './shared/cart-item';
import { CartService } from './shared/cart.service';
import { CartState } from './shared/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cart: Observable<Cart>;
  cartItems: Observable<Array<CartItem>>;

  constructor(private store: Store<CartState>,
              public dialog: MatDialog,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.store.dispatch(new InitCartAction());
    // this.cart = this.store.select(reducer.getCart);
    /* add session event */
    this.cartService.addSessionEmitted$
      .subscribe(cartMonoItem => {
        const cartItem = {
          session: cartMonoItem.item
        } as CartItem;
        this.store.dispatch(new AddCartItemAction(cartMonoItem.mono, cartItem));
      });
    /* delete session event */
    this.cartService.deleteSessionEmitted$
      .subscribe(cartMonoItem => {
        const cartItem = {
          session: cartMonoItem.item
        } as CartItem;
        this.store.dispatch(new DeleteCartItemAction(cartMonoItem.mono, cartItem));
      });
    /* open cart event */
    this.cartService.openCartEmitted$
      .subscribe(() => {
        this.openDialog();
      });
  }

  openDialog() {
    this.dialog.open(CartDialogComponent, {width: '80%', height: '95%'});
  }

  getCartItems(): Observable<Array<CartItem>> {
    return this.cartItems;
  }
}
