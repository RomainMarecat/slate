import { CCTypes } from './cc-types';

export class CCValidator {
  public static MIN_LENGTH = 14;

  // information for various credit card types as a string map
  private static _types: {[key: string]: Object} = {
    'amex': {pattern: /^3[47]/, length: 15}
    , 'disc': {pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/, length: 16}
    , 'dine': {pattern: /^36/, length: 14}
    , 'visa': {pattern: /^4/, length: 16}
    , 'mast': {pattern: /^5[1-5]/, length: 16}
  };

  /**
   * Return the credit card type based on the card number (provided the card is in the accepted list of cards)
   */
  public static getCardType(cardNumber: string): string {
    let cardProps: Object;
    const theCard: string = this.__preprocess(cardNumber);

    for (const key in this._types) {
      if (this._types[key]) {
        cardProps = this._types[key];
        if (theCard.match(cardProps['pattern'])) {
          return key;
        }
      }
    }

    return 'none';
  }

  /**
   * Is the supplied credit-card number valid
   *
   * boolean - true if the card number is recognized as a supported card type and the card-number properties are correct
   * for that card type.  Note that this does not mean the card is valid to be charged against, only that the number is theoretically
   * correct for the card type.
   */
  public static isValid(cardNumber: string): boolean {
    const testNumber: string = this.__preprocess(cardNumber);
    const cardType: string = this.getCardType(testNumber);

    if (cardType !== CCTypes.NONE) {
      return this.__lengthValid(testNumber, cardType) && this.__luhnValid(testNumber);
    }

    return false;
  }

  // remove spaces and dashes that may be present in the credit card number
  private static __preprocess(cardNumber: string): string {
    return cardNumber.replace(/[ -]/g, '');
  }

  // check the length of the credit card number based on its type
  private static __lengthValid(cardNumber: string, cardType: string): boolean {
    const cardProps: Object = this._types[cardType];
    return cardProps ? cardNumber.length === cardProps['length'] : false;
  }

  // check the credit card number with the Luhn algorithm
  private static __luhnValid(cardNumber: string): boolean {
    let digit: number;
    let n: number;
    let sum: number;
    let j: number;

    sum = 0;
    const numbers: Array<number>
      = cardNumber.split('').reverse().map((val) => parseFloat(val));
    const len: number = numbers.length;
    n = 0;
    j = 0;

    while (j < len) {
      digit = numbers[n];
      digit = +digit;

      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }

      n = ++j;
    }

    return sum % 10 === 0;
  }
}
