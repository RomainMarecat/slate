import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../order/shared/order';

export class OrderFormType {
  private form: FormGroup;

  constructor(order ?: Order) {
    this.createForm(order);
  }

  createForm(order: Order) {
    this.form = new FormGroup({
      user: new FormControl(order && order.user ? order.user : '', [
        Validators.required,
      ]),
      total: new FormControl(order && order.total ? order.total : 0, [
        Validators.required
      ]),
    });
  }

  getForm() {
    return this.form;
  }
}
