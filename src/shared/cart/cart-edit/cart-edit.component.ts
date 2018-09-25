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

  private _cart: Cart;

  user: User;
  static getForm(): FormGroup {
    return new FormGroup({
      total: new FormControl(0, [Validators.required])
    });
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

  setItems(cart: Cart) {
    if (cart && (!cart.items || cart.items.length === 0)) {
      const item: CartItem = {
        name: faker.commerce.productName(),
        code: faker.random.uuid(),
        quantity: faker.random.number(1000),
        price: faker.random.number(5000),
        created_at: faker.date.recent(),
        updated_at: faker.date.recent()
      };
      cart.items = [
        item
      ];
      this._cart = cart;
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  save() {
    if (this.form.valid) {
      const cart: Cart = {
        ...this.form.value,
        ...{
          total: 100,
          user: this.user ? this.user.uid : null,
          created_at: new Date(),
          updated_at: new Date()
        }
      };
      this.cartService.createCart(cart)
        .then(doc => {
          cart.key = doc.id;
          this.cartService.updateCart(cart)
            .then(() => {
              this.alertService.show(this.translate.instant('cart-add.saved'));
              this.submitted.emit(cart);
            }, (err) => this.alertService.show(err));
        }, (err) => this.alertService.show(err));
    }
  }

  @Input() set cart(cart) {
    this._cart = cart;
    this.setItems(cart);
  }

  get cart(): Cart {
    return this._cart;
  }
}
