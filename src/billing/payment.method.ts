export class PaymentMethod {
  private _paymentMethodId: string;

  get paymentMethodId(): string {
    return this._paymentMethodId;
  }

  set paymentMethodId(value: string) {
    this._paymentMethodId = value;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
