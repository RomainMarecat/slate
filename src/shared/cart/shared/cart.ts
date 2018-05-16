export interface Cart {
  key?: string;
  total: number;
  user: string;
  status?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CartError {
  code: string;
  message: string;
  type: string;
}

export class CreditCardList {
  static getCreditCardList() {
    return {
      list: [
        {
          brand: 'CB',
          css_class: 'cartebleue',
          image: '/assets/images/creditcards/cartebleue.png',
          verification: '^[^0-9-\s]',
          separation: '^([0-9]{4})([0-9]{6})?(?:([0-9]{6})([0-9]{5}))?$',
          hidden: '**** ****** *[0-9][0-9][0-9][0-9]',
          accepted: true,
          length: 15
        },
        {
          brand: 'American Express',
          css_class: 'american-express',
          image: '/assets/images/creditcards/american-express.png',
          verification: '^3[47][0-9]',
          separation: '^([0-9]{4})([0-9]{6})?(?:([0-9]{6})([0-9]{5}))?$',
          hidden: '**** ****** *[0-9][0-9][0-9][0-9]',
          accepted: true,
          length: 15
        },
        {
          brand: 'MasterCard',
          css_class: 'mastercard',
          image: '/assets/images/creditcards/mastercard.png',
          verification: '^5[1-5][0-9]',
          separation: '^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$',
          hidden: '**** **** **** [0-9][0-9][0-9][0-9]',
          accepted: true,
          length: 16
        },
        {
          brand: 'Visa',
          css_class: 'visa',
          image: '/assets/images/creditcards/visa.png',
          verification: '^4[0-9]',
          separation: '^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$',
          hidden: '**** **** **** [0-9][0-9][0-9][0-9]',
          accepted: true,
          length: 16
        },
        {
          brand: 'Discover',
          css_class: 'discover',
          image: '/assets/images/creditcards/discover.png',
          verification: '^6(?:011|5[0-9]{2})[0-9]',
          separation: '^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$',
          hidden: '**** **** **** [0-9][0-9][0-9][0-9]',
          accepted: false,
          length: 16
        },
        {
          brand: 'Diners Club',
          css_class: 'diners-club',
          image: '/assets/images/creditcards/dinersclub.png',
          verification: '^3(?:0[0-5]|[68][0-9])[0-9]',
          separation: '^([0-9]{4})([0-9]{4})?([0-9]{4})?(?:([0-9]{4})([0-9]{4})([0-9]{2}))?$',
          hidden: '**** **** **[0-9][0-9] [0-9][0-9]',
          accepted: false,
          length: 14
        },
        {
          brand: 'JCB',
          css_class: 'jcb',
          image: '/assets/images/creditcards/jcb.png',
          verification: '^(?:2131|1800|35[0-9]{3})[0-9]',
          separation: '^([0-9]{4})([0-9]{4})?([0-9]{4})?([0-9]{4})?$',
          hidden: '**** **** **** [0-9][0-9][0-9][0-9]',
          accepted: false,
          length: 16
        }
      ],
      active: null
    };
  }
}
