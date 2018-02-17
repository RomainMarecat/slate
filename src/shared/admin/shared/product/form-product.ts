import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Product } from './../../../product/product';
import { Partner } from './../../../partner/partner';
import { Offer } from './../../../offer/offer';

export class ProductFormType {
  private form: FormGroup;

  constructor(product ?: Product, partners ?: Array < Partner > , offers ?: Array < Offer > ) {
    this.createForm(product, partners, offers);
  }

  createForm(product: Product, partners: Array < Partner >= [], offers: Array < Offer > = []) {
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
      'offers': this.addOfferForm(product && product.offers ? product.offers : [], partners, offers),
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

  addOfferForm(productOffers: Array < string > , partners: Array < Partner > , offers: Array < Offer > ): FormArray {
    const offersForm: FormArray = new FormArray([]);
    offers.forEach((offer: Offer) => {
      if (offers.includes(offer)) {
        offersForm.push(new FormGroup({
          'key': new FormControl(offer.key ? offer.key : '', []),
          'product': new FormControl(offer.product ? offer.product : '', []),
          'partner': new FormControl(offer.partner ? offer.partner : '', []),
          'external_url': new FormControl(offer.external_url ? offer.external_url : '', [
            Validators.required,
          ]),
          'price': new FormControl(offer && offer.price ? offer.price : 0, [
            Validators.required,
          ]),
        }));
      }
    });

    return offersForm;
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
