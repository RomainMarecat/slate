import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attribute } from './../../../attribute/attribute';

export class AttributeFormType {
  private form: FormGroup;

  constructor(attribute ?: Attribute) {
    this.createForm(attribute);
  }

  createForm(attribute: Attribute) {
    this.form = new FormGroup({
      'name': new FormControl(attribute && attribute.name ? attribute.name : '', [
        Validators.required,
      ]),
      'slug': new FormControl(attribute && attribute.slug, [
        Validators.required
      ]),
      'translations': new FormGroup({
        'fr': new FormControl(attribute && attribute.translations && attribute.translations.fr ?
          attribute.translations.fr : '', [
            Validators.required
          ])
      }),
      'type': new FormControl(attribute && attribute.type ? attribute.type : true, [
        Validators.required
      ]),
      'order_by': new FormControl(attribute && attribute.order_by ? attribute.order_by : 'name', [
        Validators.required,
      ]),
      'terms': new FormControl(attribute && attribute.terms ? attribute.terms : [], [
        Validators.required,
      ]),
      'term': new FormControl('', [
      ]),
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      description: '',
      keywords: '',
      translations: {
        fr: ''
      },
      slug: '',
      alias: '',
      reseller: '',
      url: '',
      price: 0,
      images: [],
      category: null,
      published: true,
      published_at: null,
    });
    return this.form;
  }
}
