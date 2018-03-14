import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Map } from '../../../map/shared/map';

export class MapFormType {
  private form: FormGroup;

  constructor(map ?: Map) {
    this.createForm(map);
  }

  createForm(map: Map) {
    this.form = new FormGroup({
      'name': new FormControl(map && map.name ? map.name : '', [
        Validators.required,
      ]),
      'published': new FormControl(map && map.published ? map.published : true, []),
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      published: true,
    });
    return this.form;
  }
}
