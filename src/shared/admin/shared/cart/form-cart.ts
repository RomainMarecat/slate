import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../../../cart/shared/cart';

export class CartFormType {
  private form: FormGroup;

  constructor(cart ?: Cart) {
    this.createForm(cart);
  }

  createForm(cart: Cart) {
    this.form = new FormGroup({
      user: new FormControl(cart && cart.user ? cart.user : '', [
        Validators.required,
      ]),
      total: new FormControl(cart && cart.total ? cart.total : 0, [
        Validators.required
      ]),
    });
  }

  getForm() {
    return this.form;
  }
}
