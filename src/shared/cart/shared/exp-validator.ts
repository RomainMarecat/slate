import { FormControl } from '@angular/forms';

export class ExpValidator {
  static month(control: FormControl) {
    const month: number = control.value;
    if (!(month !== null && month <= 12 && month >= 1)) {
      return {'invalid': true};
    }
  }

  static year(control: FormControl) {
    const year: number = control.value;
    const now = new Date();
    const nowYear = now.getFullYear();
    if (!(year !== null && parseInt(nowYear.toString().substr(2, 2), 10) <= year)) {
      return {'invalid': true};
    }
  }
}
