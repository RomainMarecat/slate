import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../popup/alert.service';
import { FormGroup } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { Cart, CartItem } from '../shared/cart';
import { RoutingState } from '../../util/routing-state';
import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../loader/loader.service';

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
              private alertService: AlertService,
              private translate: TranslateService,
              private router: Router,
              private routingState: RoutingState,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.routingState.loadRouting();
  }

  save() {
    if (this.form.valid) {
      if (this.cart) {
        this.cart.updated_at = new Date();
        this.isSaving = true;
        this.loaderService.show();
        this.cartService.updateCart(this.cart)
          .subscribe(() => {
            this.alertService.openAlertMessage(
              {title: '', message: 'cart-add.saved'},
              {panelClass: 'alert-success'}
            );
            this.submitted.emit(this.cart);
            this.loaderService.hide();
            this.isSaving = false;
          }, () => {
            this.isSaving = false;
            this.loaderService.hide();
            if (!navigator.onLine) {
              this.alertService.openAlertMessage(
                {title: '', message: 'error.no-internet-connection'},
                {panelClass: 'alert-danger'}
              );
              return;
            }
            this.alertService.openAlertMessage(
              {title: '', message: 'cart-add.error.validate-cart'},
              {panelClass: 'alert-danger'}
            );
          });
      }
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
