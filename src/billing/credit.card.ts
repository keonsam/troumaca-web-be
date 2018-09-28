export class CreditCard {
  private _creditCardId: string;
  private _paymentMethodId = '9f9e5106-1235-4f61-9609-b8fea945e066';
  private _cardName: string;
  private _cardNumber: string;
  private _cardExpDate: Date;
  private _cardCVV: string;
  private _status: string;
  private _ending: string;

  get creditCardId(): string {
    return this._creditCardId;
  }

  set creditCardId(value: string) {
    this._creditCardId = value;
  }

  get cardName(): string {
    return this._cardName;
  }

  set cardName(value: string) {
    this._cardName = value;
  }

  get cardNumber(): string {
    return this._cardNumber;
  }

  set cardNumber(value: string) {
    this._cardNumber = value;
  }

  get cardExpDate(): Date {
    return this._cardExpDate;
  }

  set cardExpDate(value: Date) {
    this._cardExpDate = value;
  }

  get cardCVV(): string {
    return this._cardCVV;
  }

  set cardCVV(value: string) {
    this._cardCVV = value;
  }


  get status(): string {
      return this._status;
  }

  set status(value: string) {
      this._status = value;
  }

  get ending(): string {
      return this._ending;
  }

  set ending(value: string) {
      this._ending = value;
  }
}
