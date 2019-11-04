import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from './../../../offer/offer';

export class OfferFormType {
  private form: FormGroup;

  constructor(offer ?: Offer) {
    this.createForm(offer);
  }

  createForm(offer: Offer) {
    this.form = new FormGroup({
      price: new FormControl(offer && offer.price ? offer.price : '', [
        Validators.required,
      ]),
      external_url: new FormControl(offer && offer.external_url ? offer.external_url : '', [
        Validators.required,
      ]),
      product: new FormControl(offer && offer.product ? offer.product : '', [
        Validators.required,
      ]),
      partner: new FormControl(offer && offer.partner ? offer.partner : '', [
        Validators.required,
      ]),
      published: new FormControl(offer && offer.published ? offer.published : true, []),
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      price: '',
      published: true,
      external_url: '',
      product: '',
      partner: ''
    });
    return this.form;
  }
}
