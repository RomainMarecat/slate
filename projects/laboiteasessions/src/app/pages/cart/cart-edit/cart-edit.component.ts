import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from '../../../shared/services/cart.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: ['./cart-edit.component.scss']
})
export class CartEditComponent implements OnInit {
  form: FormGroup = CartEditComponent.getForm();
  cart: Cart;
  isSaving: boolean;

  static getForm(): FormGroup {
    return new FormGroup({});
  }

  constructor(private cartService: CartService,
              private translate: TranslateService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.filters$.next([
      {
        column: 'status',
        operator: '==',
        value: 'current'
      }
    ]);
    this.cartService.getCurrentCart()
      .pipe(
        take(1)
      )
      .subscribe((cart: Cart) => {
        this.cart = cart;
      });
  }

  save() {
    if (this.form.valid) {
      if (this.cart) {
        this.isSaving = true;
        this.cart.state = 'connection';
        this.authenticationService.getUser()
          .subscribe(() => {
            this.cart.state = 'delivery';
            this.updateCart(this.cart);
            this.nextStep(this.cart);
          }, () => {
            this.updateCart(this.cart);
            this.nextStep(this.cart);
          });
      }
    }
  }

  nextStep(cart: Cart) {
    this.router.navigate(
      ['/cart', cart.state]
    );
  }

  updateCart(cart: Cart) {
    this.cartService.validCart(cart)
      .subscribe((updatedCart: Cart) => {
        this.cartService.cart$.next(updatedCart);
        this.isSaving = false;
      }, () => {
        this.isSaving = false;
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
