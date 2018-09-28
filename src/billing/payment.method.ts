export class PaymentMethod {
  private _paymentMethodId: string;
  private _name: string;

  get paymentMethodId(): string {
    return this._paymentMethodId;
  }

  set paymentMethodId(value: string) {
    this._paymentMethodId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
