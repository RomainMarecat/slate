import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart, CartItem } from 'shared/cart/shared/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  totalQuantity = 0;

  @Input() cart: Cart;

  @Input() item: CartItem;

  @Input() editable = true;

  /**
   * Aller à l'étape suivante
   * @type {EventEmitter<boolean>}
   */
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * article ou articleS
   */
  articleWord = 'word.article';

  @Output() productUpdate: EventEmitter<{
    item: CartItem,
    quantity: number
  }> = new EventEmitter<{item: CartItem, quantity: number}>();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * @param item
   */
  updateTotalQuantity(item: CartItem) {
    this.totalQuantity = item.quantity;
    this.articleWord = (this.totalQuantity > 1) ? 'word.articles' : 'word.article';
  }

  onNextStep() {
    this.nextStep.emit(true);
  }

  /**
   * @param item
   * @param quantity
   */
  updateCartItemQuantity(item: CartItem, quantity: number) {
    this.productUpdate.emit({
      item: item,
      quantity: quantity
    });
  }

}
