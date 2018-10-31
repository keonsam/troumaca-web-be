export class CreditCard {
  private _paymentMethodId = "9f9e5106-1235-4f61-9609-b8fea945e066";

  private _creditCardId: string;

  get creditCardId(): string {
    return this._creditCardId;
  }

  set creditCardId(value: string) {
    this._creditCardId = value;
  }

  private _cardName: string;

  get cardName(): string {
    return this._cardName;
  }

  set cardName(value: string) {
    this._cardName = value;
  }

  private _cardNumber: string;

  get cardNumber(): string {
    return this._cardNumber;
  }

  set cardNumber(value: string) {
    this._cardNumber = value;
  }

  private _cardExpDate: Date;

  get cardExpDate(): Date {
    return this._cardExpDate;
  }

  set cardExpDate(value: Date) {
    this._cardExpDate = value;
  }

  private _cardCVV: string;

  get cardCVV(): string {
    return this._cardCVV;
  }

  set cardCVV(value: string) {
    this._cardCVV = value;
  }

  private _status: string;

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  private _ending: string;

  get ending(): string {
    return this._ending;
  }

  set ending(value: string) {
    this._ending = value;
  }
}
