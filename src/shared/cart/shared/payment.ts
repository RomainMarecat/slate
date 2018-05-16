import { ExpValidator } from './exp-validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from './credit-card-validator';
export interface Payment {
  key?: string;
  token: string;
  order?: string;
  created_at: Date;
  updated_at: Date;
}

export class CardForm {
  static getForm(): FormGroup {
    return new FormGroup({
      number: new FormControl('', [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(16),
          CreditCardValidator.Luhn
        ]
      ),
      cvv: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4)
      ]),
      exp: new FormGroup({
        month: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          ExpValidator.month
        ]),
        year: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          ExpValidator.year
        ])
      })
    });
  }
}
