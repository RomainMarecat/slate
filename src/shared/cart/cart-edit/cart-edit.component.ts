import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../popup/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/cart';
import { RoutingState } from '../../util/routing-state';
import { User } from '../../user/user';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.component.html',
  styleUrls: [ './cart-edit.component.scss' ]
})
export class CartEditComponent implements OnInit {

  reasons: { name: string }[] = [];
  form: FormGroup = CartEditComponent.getForm();
  @Output() submitted: EventEmitter<Cart> = new EventEmitter<Cart>();

  user: User;

  static getForm(): FormGroup {
    return new FormGroup({
      reason: new FormControl('', [ Validators.required ])
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
    this.reasons = [
      {name: 'reason.creation'},
      {name: 'reason.prunning'},
      {name: 'reason.maintenance'},
      {name: 'reason.spray'},
      {name: 'reason.planning'},
    ];
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

}
