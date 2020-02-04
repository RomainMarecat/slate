import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: ['./cart-edit.component.scss']
})
export class CartEditComponent implements OnInit {
  form: FormGroup = CartEditComponent.getForm();
  @Output() submitted: EventEmitter<Cart> = new EventEmitter<Cart>();

  @Output() updateCart: EventEmitter<Cart> = new EventEmitter<Cart>();

  @Input() cart: Cart;

  isSaving: boolean;

  static getForm(): FormGroup {
    return new FormGroup({});
  }

  constructor(private cartService: CartService,
              private translate: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    if (this.form.valid) {
      if (this.cart) {
        // this.loaderService.show();
        this.cart.updated_at = new Date();
        this.isSaving = true;
        // this.cartService.updateCart(this.cart)
        //   .subscribe(() => {
        //     // this.alertService.openAlertMessage(
        //     //   {title: '', message: 'cart-add.saved'},
        //     //   {panelClass: 'alert-success'}
        //     // );
        //     this.submitted.emit(this.cart);
        //     // this.loaderService.hide();
        //     this.isSaving = false;
        //   }, () => {
        //     this.isSaving = false;
        //   });
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
