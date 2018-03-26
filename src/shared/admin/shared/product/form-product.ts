import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Product } from './../../../product/product';
import { Partner } from './../../../partner/partner';
import { Offer } from './../../../offer/offer';

export class ProductFormType {
  private form: FormGroup;

  constructor(product ?: Product, offers ?: Array < Offer > ) {
    this.createForm(product, offers);
  }

  static newOffer(offer ?: Offer): FormGroup {
    return new FormGroup({
      'key': new FormControl(offer && offer.key ? offer.key : '', []),
      'product': new FormControl(offer && offer.product ? offer.product : '', []),
      'partner': new FormControl(offer && offer.partner ? offer.partner : '', [
        Validators.required,
      ]),
      'external_url': new FormControl(offer && offer.external_url ? offer.external_url : '', [
        Validators.required,
      ]),
      'price': new FormControl(offer && offer.price ? offer.price : 0, [
        Validators.required,
      ]),
    });
  }

  static createOfferForm(product ?: Product, offers: Array < Offer > = []): FormArray {
    const offersForm: FormArray = new FormArray([new FormControl()]);
    if (product && product.offers && product.offers.length > 0) {
      product.offers.forEach((offer: string) => {
        offersForm.push(ProductFormType.newOffer());
      });
    }
    offers.forEach((offer: Offer) => {
      if (offers.includes(offer)) {
        offersForm.push(new FormGroup({
          'key': new FormControl(offer.key ? offer.key : '', []),
          'product': new FormControl(offer.product ? offer.product : '', [
            Validators.required,
          ]),
          'partner': new FormControl(offer.partner ? offer.partner : '', [
            Validators.required,
          ]),
          'external_url': new FormControl(offer.external_url ? offer.external_url : '', [
            Validators.required,
          ]),
          'price': new FormControl(offer && offer.price ? offer.price : 0, [
            Validators.required,
          ]),
        }));
      }
    });
    // if (product && offersForm.length === 0) {
    //   offersForm.push(ProductFormType.newOffer());
    // }

    return offersForm;
  }

  createForm(product: Product, offers: Array < Offer > = []): FormGroup {
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
      // 'offers': ProductFormType.createOfferForm(product ? product : null, offers),
      'offers': new FormArray([]),
      'published': new FormControl(product && product.published ? product.published : true, []),
      'price': new FormControl(product && product.price ? product.price : 0, [
        Validators.required,
      ]),
      'images': new FormControl(product && product.images ? product.images : [], [
        Validators.required,
      ]),
      'category': new FormControl(product && product.category ? product.category : ''),
      'attributes': new FormControl(product && product.attributes ? product.attributes : [], []),
    });

    return this.form;
  }

  getForm(): FormGroup {
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
