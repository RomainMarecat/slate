import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart, CartItem } from '../../../../shared/interfaces/cart';

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
   */
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * article ou articleS
   */
  articleWord = 'word.article';

  @Output() cartItemUpdate: EventEmitter<{
    cartItem: CartItem,
    quantity: number
  }> = new EventEmitter<{cartItem: CartItem, quantity: number}>();

  constructor() {
  }

  ngOnInit() {
  }

  updateTotalQuantity(item: CartItem) {
    this.totalQuantity = item.quantity;
    this.articleWord = (this.totalQuantity > 1) ? 'word.articles' : 'word.article';
  }

  onNextStep() {
    this.nextStep.emit(true);
  }

  updateCartItemQuantity(item: CartItem, quantity: string) {
    this.cartItemUpdate.emit({
      cartItem: item,
      quantity: parseInt(quantity, 10)
    });
  }

}
