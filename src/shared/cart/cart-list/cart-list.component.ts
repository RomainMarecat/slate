import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'shared/cart/shared/cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  _cart: Cart;

  totalQuantity: number;

  articleWord: string;

  editable: boolean;

  constructor() { }

  ngOnInit() {
  }

  @Input() set cart(cart) {
    this._cart = cart;
  }

  get cart(): Cart {
    return this._cart;
  }

  onNextStep() {

  }
}
