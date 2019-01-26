import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../shared/cart';
import { CartItem } from '../shared/cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() cart: Cart;

  totalQuantity: number;

  articleWord: string;

  editable: boolean;

  @Output() updateCart: EventEmitter<Cart> = new EventEmitter<Cart>();

  constructor() {
  }

  ngOnInit() {
  }

  onNextStep() {
  }

  onCartItemChange(event: {cartItem: CartItem, quantity: number}) {
    let total = 0;
    this.cart.items = this.cart.items.map((item: CartItem) => {
      if (item.code === event.cartItem.code) {
        item.quantity = event.quantity;
      }
      total += item.quantity * item.price;

      return item;
    });
    this.cart.items = this.cart.items.filter(item => item.quantity > 0);
    this.cart.total = total;

    this.updateCart.emit(this.cart);
  }
}
