import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Product } from './../../../product/product';

export class ProductFormType {
  private form: FormGroup;

  constructor(product ?: Product) {
    this.createForm(product);
  }

  createForm(product: Product) {
    this.form = new FormGroup({
      'name': new FormControl(product && product.name ? product.name : '', [
        Validators.required,
      ]),
      'slug': new FormControl(product && product.slug, []),
      'alias': new FormControl(product && product.alias, []),
      'translations': new FormGroup({
        'fr': new FormControl(product && product.translations && product.translations.fr ?
          product.translations.fr : '', [
            Validators.required
          ])
      }),
      'description': new FormControl(
        product && product.description ? product.description : '', []
      ),
      'keywords': new FormControl(
        product && product.keywords ? product.keywords : '', []
      ),
      'partners': new FormArray([
        this.addPartnerForm(product)
      ]),
      'published': new FormControl(product && product.published ? product.published : true, []),
      'price': new FormControl(product && product.price ? product.price : 0, [
        Validators.required,
      ]),
      'images': new FormControl(product && product.images ? product.images : [], [
        Validators.required,
      ]),
      'category': new FormControl(product && product.category ? product.category : '', [
        Validators.required,
      ]),
      'attributes': new FormControl(product && product.attributes ? product.attributes : null, []),
    });
  }

  addPartnerForm(product) {
    return new FormGroup({
      'reseller': new FormControl(product && product.reseller ? product.reseller : '', [
        Validators.required,
      ]),
      'external_url': new FormControl(product && product.external_url ? product.external_url : '', [
        Validators.required,
      ]),
      'price': new FormControl(product && product.price ? product.price : 0, [
        Validators.required,
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
      external_url: '',
      price: 0,
      images: [],
      category: null,
      published: true,
      published_at: null,
    });
    return this.form;
  }
}
