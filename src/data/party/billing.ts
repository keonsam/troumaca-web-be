export class Billing {
  private _billingId: string;

  get billingId(): string {
    return this._billingId;
  }

  set billingId(value: string) {
    this._billingId = value;
  }

  private _methodId: string;

  get methodId(): string {
    return this._methodId;
  }

  set methodId(value: string) {
    this._methodId = value;
  }

  private _confirmed: boolean;

  get confirmed(): boolean {
    return this._confirmed;
  }

  set confirmed(value: boolean) {
    this._confirmed = value;
  }

  private _type: string;

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}
