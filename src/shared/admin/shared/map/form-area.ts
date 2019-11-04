import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Area } from '../../../map/shared/area';
import { Map } from '../../../map/shared/map';

export class AreaFormType {
  private form: FormGroup;

  constructor(map ?: Map) {
    this.createForm(map);
  }

  createForm(map: Map) {
    this.form = new FormGroup({
      name: new FormControl( '', [
        Validators.required,
      ]),
      path: new FormControl('', [
        Validators.required,
      ]),
      map: new FormControl(map && map.key ? map.key : '', [
        Validators.required,
      ]),
      published: new FormControl(true, []),
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      path: '',
      published: true,
    });
    return this.form;
  }
}
