export class CCTypes {
  public static NONE: 'none';
  public static AMERICAN_EXPRESS: 'amex';
  public static DISCOVER: 'disc';
  public static DINERS_CLUB_INTERNATIONAL: 'dine';
  public static VISA: 'visa';
  public static MASTERCARD: 'mast';

  public static isAccepted(cardName: string): boolean {
    return cardName === this.AMERICAN_EXPRESS ||
      cardName === this.DISCOVER ||
      cardName === this.DINERS_CLUB_INTERNATIONAL ||
      cardName === this.VISA ||
      cardName === this.MASTERCARD;
  }
}
