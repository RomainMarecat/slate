import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Partner } from './../../../partner/partner';

export class PartnerFormType {
  private form: FormGroup;

  constructor(partner ?: Partner) {
    this.createForm(partner);
  }

  createForm(partner: Partner) {
    this.form = new FormGroup({
      'name': new FormControl(partner && partner.name ? partner.name : '', [
        Validators.required,
      ]),
      'website': new FormControl(partner && partner.website ? partner.website : '', [
        Validators.required,
      ]),
      'published': new FormControl(partner && partner.published ? partner.published : true, []),
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      published: true,
      website: '',
    });
    return this.form;
  }
}
