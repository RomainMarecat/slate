import { FormControl } from '@angular/forms';
import { CCValidator } from './cc-validator';

export class CreditCardValidator {
  static Luhn (control: FormControl) {
    const card: string = control.value.toString();
    if (card.length > 0) {
      if (card.length < CCValidator.MIN_LENGTH) {
        return { 'minLength': true };
      }

      if (!CCValidator.isValid(card)) {
        return { 'invalid': true };
      }
    }
  }
}
