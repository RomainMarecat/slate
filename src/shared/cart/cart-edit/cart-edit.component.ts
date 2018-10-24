import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../popup/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { Cart, CartItem } from '../shared/cart';
import { RoutingState } from '../../util/routing-state';
import { User } from '../../user/shared/user';
import * as faker from 'faker';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: ['./cart-edit.component.scss']
})
export class CartEditComponent implements OnInit {

  form: FormGroup = CartEditComponent.getForm();
  @Output() submitted: EventEmitter<Cart> = new EventEmitter<Cart>();

  @Input() cart: Cart;

  @Output() updateCart: EventEmitter<Cart> = new EventEmitter<Cart>();

  static getForm(): FormGroup {
    return new FormGroup({});
  }

  constructor(private cartService: CartService,
              private alertService: AlertService,
              private translate: TranslateService,
              private router: Router,
              private routingState: RoutingState) {
  }

  ngOnInit() {
    this.routingState.loadRouting();
  }

  setProduct() {
    if (this.cart) {
      const item: CartItem = {
        name: faker.commerce.productName(),
        code: faker.random.uuid(),
        quantity: faker.random.number(1000),
        price: faker.random.number(5000),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
      };
      this.cart.items.push(item);

      this.cart.total += item.price * item.quantity;
    }
  }

  save() {
    if (this.form.valid) {
      this.cart.updated_at = new Date();

      this.cartService.updateCart(this.cart)
        .then(() => {
          this.alertService.show(this.translate.instant('cart-add.saved'));
          this.submitted.emit(this.cart);
        }, (err) => this.alertService.show(err));
    }
  }
}
